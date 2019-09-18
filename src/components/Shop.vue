<template>
  <div id="iframe-container" :class="[device, !displayHeader ? 'full-screen' : '']">
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
    ...mapState(['device', 'ready', 'displayHeader']),
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
    // eslint-disable-next-line no-console
    console.log('Vue Shop idmodule :', this.$route.query.idmodule, 'name :', this.$route.query.module_name_toinstall);
    const payload = {
      idmodule: this.$route.query.idmodule,
      moduleNameToinstall: this.$route.query.module_name_toinstall,
    };
    this.$store.dispatch('requestMachine', payload);
  },
};
</script>
