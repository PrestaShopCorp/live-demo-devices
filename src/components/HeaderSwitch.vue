<template>
  <a class="btn btn-collapse"
      v-on:click="toggleHeader()"
      :class="[!displayHeader ? 'collapsed': '']"
  >
    <span class="hide-header" v-show="displayHeader">{{ $t("hide") }}</span>
    <span class="show-header" v-show="!displayHeader">{{ $t("show") }}</span>
  </a>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HeaderSwitch',
  computed: {
    ...mapState(['device', 'ready', 'displayHeader']),
  },
  methods: {
    toggleHeader() {
      this.$store.commit('toggleHeaderVisibility');
    },
  },
};
</script>
