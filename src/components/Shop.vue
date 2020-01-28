<template>
  <div id="iframe-container" :class="[device, (!displayHeader || !displayUI) ? 'full-screen' : '']">
    <div id="iframe-wrapper">
      <div class="loadingMessageWrapper">
        <div id="loadingMessage" v-show="!ready">
          <img src="../assets/loading.gif" alt="loading">
          <p v-show="noShopAssigned">{{ $t("creating shop") }}</p>
        </div>
      </div>
      <iframe id="framelive" name="framelive" frameBorder="0"
        @load="setIframeReady" :src="iframeUrl"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Shop',
  props: ['view'],
  computed: {
    iframeUrl() {
      return this.$store.state.links[this.view] || null;
    },
    noShopAssigned() {
      return !this.$store.state.links.front.length;
    },
    ...mapState(['device', 'ready', 'displayHeader', 'displayUI']),
  },
  methods: {
    toggleHeader() {
      this.$store.commit('toggleHeaderVisibility');
    },
    setIframeReady() {
      if (this.iframeUrl) {
        this.$store.commit('setIframeReady');
      }
    },
  },
  created() {
    const payload = {};
    if (this.$route !== undefined && this.$route.query !== undefined) {
      payload.idmodule = this.$route.query.idmodule;
      payload.moduleNameToinstall = this.$route.query.module_name_toinstall;

      if (this.$route.query.no_ui !== undefined) {
        this.$store.commit('hideUi');
      }
    }
    this.$store.dispatch('requestMachine', payload);
  },
};
</script>
