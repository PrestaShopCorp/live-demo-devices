import Vue from 'vue';
import io from 'socket.io-client';

const baseEndpoint = process.env.MS_DOMAIN || 'integration-shuffle.prestashop.net';

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
        front: `http:/${payload.domain}.${baseEndpoint}/`,
        back: `http:/${payload.domain}.${baseEndpoint}/admin-dev/index.php?controller=AdminLogin&email=demo@prestashop.com&password=prestashop_demo`,
      };
    },
    fallbackToOldDemo: (state) => {
      state.links = {
        front: 'http://fo.demo.prestashop.com/',
        back: 'http://bo.demo.prestashop.com/demo/index.php?controller=AdminLogin&email=demo@prestashop.com&password=prestashop_demo',
      };
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
        }, 10000);
      }).catch(() => {
        commit('fallbackToOldDemo');
        console.error('The service is unavailable, please try later');
      });
    },
  },
};
