<template>
  <div id="header" v-show="displayHeader && displayUI">
    <div id="logo" class="block_header">
    <img src="../assets/logo_prestashop.png" alt="PrestaShop logo" />
    </div>
    <ul id="devices">
      <DeviceButton deviceTrigger="desktop" icon="&#xE30C;" />
      <DeviceButton deviceTrigger="tablet-h" icon="&#xE32F;"/>
      <DeviceButton deviceTrigger="tablet-v" icon="&#xE32F;"/>
      <DeviceButton deviceTrigger="mobile" icon="&#xE325;"/>
    </ul>
    <a v-if="demoShopIsBlankPrestashop" class="btn btn-download" target="_blank" href="https://www.prestashop.com/" rel="noopener">
      {{ $t("start") }}
    </a>
    <router-link to="back" class="btn btn-explore btn-visible-small btn-explore-bo"
      @click.native="updateIframeLink"
    >
      <span>{{ $t("explore-back") }}</span>
      <img :alt="$t('explore-back')" src="../../public/switch-BO-FO.png" />
    </router-link>
    <router-link to="front" class="btn btn-explore btn-visible-small btn-explore-front"
      @click.native="updateIframeLink"
    >
      <span>{{ $t("explore-front") }}</span>
      <img :alt="$t('explore-front')" src="../../public/switch-BO-FO.png" />
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DeviceButton from './DeviceButton.vue';

export default {
  name: 'DemoHeader',
  computed: {
    ...mapState(['device', 'displayHeader', 'displayUI']),
    demoShopIsBlankPrestashop() {
      return undefined === this.$store.state.factory.params.id_module
        || undefined === this.$store.state.factory.params.id_module_showcased
        || undefined === this.$store.state.factory.params.module_name_toinstall;
    },
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
