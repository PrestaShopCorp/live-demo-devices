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
      return this.$store.state.links[this.view] + this.$i18n.locale;
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
};
</script>
