export default {
  state: {
    ready: false,
    device: 'desktop',
    displayHeader: true,
    links: {
      front: 'http://fo.demo.prestashop.com/',
      back: 'http://bo.demo.prestashop.com/demo/index.php?controller=AdminLogin&email=demo@prestashop.com&password=prestashop_demo',
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
  },
  actions: {
  },
};
