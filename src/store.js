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
        front: `http:/${payload.domain}.${state.factory.baseEndpoint}/${i18n.locale}`,
        back: `http:/${payload.domain}.${state.factory.baseEndpoint}/admin-dev/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo&redirect=AdminModules`,
      };
    },
    fallbackToOldDemo: (state) => {
      state.links = {
        front: `http://fo.demo.prestashop.com/${i18n.locale}`,
        back: `http://bo.demo.prestashop.com/demo/index.php?controller=AdminLogin&email=demo${i18n.locale}@prestashop.com&password=prestashop_demo`,
      };
    },
    setBaseEndpoint: (state, domain) => {
      if (domain.includes('demo.')) {
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

        setTimeout(() => {
          commit('setShopUrl', { domain: container.name });
        },
        // If we reuse an existing container, display it immediately
        container.newContainer ? 10000 : 0);
      }).catch(() => {
        commit('fallbackToOldDemo');
        console.error('The service is unavailable, please try later');
      });
    },
  },
};
