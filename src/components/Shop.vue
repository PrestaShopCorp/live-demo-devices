<template>
  <div id="iframe-container" :class="[device, !displayHeader ? 'full-screen' : '']">
    <div id="iframe-wrapper">
    <div id="loadingMessage" v-show="!ready">
      <img src="../assets/loading.gif" alt="loading">
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
    ...mapState(['device', 'ready', 'displayHeader']),
  },
  methods: {
    toggleHeader() {
      this.$store.commit('toggleHeaderVisibility');
    },
    setIframeReady() {
      this.$store.commit('setIframeReady');
    },
  },
  created() {
    this.$store.commit('setBaseEndpoint', window.location.host);
    this.$store.dispatch('requestMachine');
  },
};
</script>
