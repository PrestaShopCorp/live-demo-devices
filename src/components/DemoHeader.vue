<template>
  <div id="header" v-show="displayHeader && displayUI">
    <div id="logo" class="block_header">
      <a :href="`https://www.prestashop.com/${locale}/`">
        <img src="../assets/logo-white.svg" alt="PrestaShop logo" />
      </a>
    </div>
    <ul id="devices">
      <DeviceButton deviceTrigger="desktop" icon="computer" />
      <DeviceButton deviceTrigger="tablet-h" icon="tablet"/>
      <DeviceButton deviceTrigger="tablet-v" icon="smartphone"/>
      <DeviceButton deviceTrigger="mobile" icon="phone_iphone"/>
    </ul>
    <div id="buttons">
      <a v-if="demoShopIsBlankPrestashop" class="btn btn-download" target="_blank" :href="`https://www.prestashop.com/${locale}/download`" rel="noopener">
        {{ $t("start") }}
        <span class="material-symbols-outlined">arrow_right</span>
      </a>
      <router-link to="back" class="btn btn-explore btn-visible-small btn-explore-bo"
        @click.native="updateIframeLink"
      >
        <span>{{ $t("explore-back") }}</span>
        <span class="material-symbols-outlined">arrow_right</span>
        <img :alt="$t('explore-back')" src="../../public/switch-BO-FO.png" />
      </router-link>
      <router-link to="front" class="btn btn-explore btn-visible-small btn-explore-front"
        @click.native="updateIframeLink"
      >
        <span>{{ $t("explore-front") }}</span>
        <span class="material-symbols-outlined">arrow_right</span>
        <img :alt="$t('explore-front')" src="../../public/switch-BO-FO.png" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DeviceButton from './DeviceButton.vue';
import i18n from '../i18n';

export default {
  name: 'DemoHeader',
  computed: {
    ...mapState(['device', 'displayHeader', 'displayUI']),
    demoShopIsBlankPrestashop() {
      return undefined === this.$store.state.factory.params.id_module
        || undefined === this.$store.state.factory.params.id_module_showcased
        || undefined === this.$store.state.factory.params.module_name_toinstall;
    },
    locale() {
      return i18n.locale;
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
