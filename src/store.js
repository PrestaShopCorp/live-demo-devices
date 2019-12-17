import Vue from 'vue';
import io from 'socket.io-client';
import i18n from './i18n';

const baseEndpoint = process.env.MS_DOMAIN || 'machine-shuffle.prestashop.net';

export default {
  state: {
    ready: false,
    device: 'desktop',
    displayHeader: true,
    links: {
      front: '',
      back: '',
    },
    factory: {
      apiEndpoint: `https://api.${baseEndpoint}/api/v1/`,
      socketEndpoint: `https://socket.${baseEndpoint}/`,
      params: {
        version: '1.7',
        api_key: 'anonymous',
      },
    },
  },
  mutations: {
    displayDemoOn: (state, device) => {
      state.device = device;
    },
    toggleHeaderVisibility: (state) => {
      state.displayHeader = !state.displayHeader;
    },
    setIframeLoading: (state) => {
      state.ready = false;
    },
    setIframeReady: (state) => {
      state.ready = true;
    },
    setShopUrl: (state, payload) => {
      state.links = {
        front: `https:/${payload.domain}.${baseEndpoint}/${i18n.locale}/`,
        back: `https:/${payload.domain}.${baseEndpoint}/admin-dev/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo`,
      };
    },
    fallbackToOldDemo: (state) => {
      state.links = {
        front: `https://fo.demo.prestashop.com/${i18n.locale}`,
        back: `https://bo.demo.prestashop.com/demo/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo`,
      };
    },
  },
  actions: {
    requestMachine: ({ commit, state }, payload) => {
      state.factory.params = Object.assign({}, state.factory.params, {
        id_module: payload.idmodule,
        module_name_toinstall: payload.moduleNameToinstall,
      });
      Vue.http.post(
        `${state.factory.apiEndpoint}machine`,
        state.factory.params,
      ).then((response) => {
        const container = response.body;
        const socket = io(state.factory.socketEndpoint);
        socket.on('connect', () => {
          socket.emit('sendId', container.id);
        });
        // eslint-disable-next-line no-console
        console.log('Using API: ', baseEndpoint, ' idmodule: ', payload.idmodule, ' name: ', payload.moduleNameToinstall);

        // If the shop could not start in a given time, fallback
        const timeout = setTimeout(() => { commit('fallbackToOldDemo'); }, 20000);
        // Make sure a webserver is started before updating the iframe,
        // to avoid error messages at startup
        const recurrentCheck = setInterval(() => {
          Vue.http.head(`https:/${container.name}.${baseEndpoint}/error500.html`).then((headResponse) => {
            if (headResponse.status !== 502) {
              // Webserver answered, cancel all checks and display the shop
              clearTimeout(timeout);
              commit('setShopUrl', { domain: container.name });
              clearInterval(recurrentCheck);
            }
          }).catch(() => {});
        }, 2000);
      }).catch((error) => {
        commit('fallbackToOldDemo');
        // eslint-disable-next-line no-console
        console.error('The service is unavailable, please try later', error);
      });
    },
  },
};
