<template>
  <a class="btn btn-collapse"
      v-on:click="toggleHeader()"
      :class="[!displayHeader ? 'collapsed': '']"
      v-show="displayUI"
  >
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
  },
  methods: {
    toggleHeader() {
      this.$store.commit('toggleHeaderVisibility');
    },
  },
};
</script>
