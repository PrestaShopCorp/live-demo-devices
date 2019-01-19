<template>
  <div id="header" v-show="displayHeader">
    <div id="logo" class="block_header">
    <img src="../assets/logo_prestashop.png" />
    </div>
    <ul id="devices">
      <DeviceButton deviceTrigger="desktop" icon="&#xE30C;" />
      <DeviceButton deviceTrigger="tablet-h" icon="&#xE32F;"/>
      <DeviceButton deviceTrigger="tablet-v" icon="&#xE32F;"/>
      <DeviceButton deviceTrigger="mobile" icon="&#xE325;"/>
    </ul>
    <a class="btn btn-download" target="_blank" href="http://www.prestashop.com/">
      {{ $t("start") }}
    </a>
    <router-link to="back" class="btn btn-explore btn-explore-bo"
      @click.native="updateIframeLink"
    >
      {{ $t("explore-back") }}
    </router-link>
    <router-link to="front" class="btn btn-explore btn-explore-front"
      @click.native="updateIframeLink"
    >
      {{ $t("explore-front") }}
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DeviceButton from './DeviceButton';

export default {
  name: 'Header',
  computed: {
    ...mapState(['device', 'displayHeader']),
  },
  components: {
    DeviceButton,
  },
  methods: {
    updateIframeLink() {
      // Show the loading spinner when switching between front & back
      this.$store.commit('setIframeLoading');
    },
  },
};
</script>
