import Vue from 'vue';
import io from 'socket.io-client';
import i18n from './i18n';

const defaultBaseEndpoint = 'machine-shuffle.prestashop.net';

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
      baseEndpoint: null,
      apiEndpoint: null,
      socketEndpoint: null,
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
        front: `http:/${payload.domain}.${state.factory.baseEndpoint}/${i18n.locale}/`,
        back: `http:/${payload.domain}.${state.factory.baseEndpoint}/admin-dev/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo`,
      };
    },
    fallbackToOldDemo: (state) => {
      state.links = {
        front: `http://fo.demo.prestashop.com/${i18n.locale}`,
        back: `http://bo.demo.prestashop.com/demo/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo`,
      };
    },
    setBaseEndpoint: (state, domain) => {
      if (domain !== 'demo.prestashop.com' && domain.includes('demo.')) {
        state.factory.baseEndpoint = domain.replace('demo.', '');
      } else {
        state.factory.baseEndpoint = defaultBaseEndpoint;
      }
      state.factory.apiEndpoint = `https://api.${state.factory.baseEndpoint}/api/v1/`;
      state.factory.socketEndpoint = `https://socket.${state.factory.baseEndpoint}/`;
    },
  },
  actions: {
    requestMachine: ({ commit, state }) => {
      Vue.http.post(
        `${state.factory.apiEndpoint}machine`,
        state.factory.params,
      ).then((response) => {
        const container = response.body;
        const socket = io(state.factory.socketEndpoint);
        socket.on('connect', () => {
          socket.emit('sendId', container.id);
        });

        // If the shop could not start in a given time, fallback
        const timeout = setTimeout(() => { commit('fallbackToOldDemo'); }, 20000);
        // Make sure a webserver is started before updating the iframe,
        // to avoid error messages at startup
        const recurrentCheck = setInterval(() => {
          Vue.http.head(`http:/${container.name}.${state.factory.baseEndpoint}/error500.html`).then((headResponse) => {
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
