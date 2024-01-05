<template>
  <a class="btn btn-collapse"
      v-on:click="toggleHeader()"
      :class="[!displayHeader ? 'collapsed': '']"
      v-show="displayUI"
  >
    <i class="material-symbols-outlined">{{ icon }}</i>
    <span class="hide-header" v-if="displayHeader">{{ $t("hide") }}</span>
    <span class="show-header" v-else>{{ $t("show") }}</span>
  </a>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderSwitch',
  computed: {
    ...mapState(['device', 'ready', 'displayHeader', 'displayUI']),
    icon() {
      return this.displayHeader ? 'expand_less' : 'expand_more';
    },
  },
  methods: {
    toggleHeader() {
      this.$store.commit('toggleHeaderVisibility');
    },
  },
};
</script>
