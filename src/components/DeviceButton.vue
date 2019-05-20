<template>
  <li>
    <a class="change-device"
      :class="[
        deviceTrigger,
        device == deviceTrigger ? 'active': ''
      ]"
      v-on:click="displayOn(deviceTrigger)"
    >
      <i class="material-icons" v-html="icon"></i>
    </a>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DeviceButton',
  props: ['deviceTrigger', 'icon'],
  computed: {
    ...mapState(['device']),
  },
  methods: {
    displayOn(device) {
      this.$store.commit('displayDemoOn', device);
    },
  },
};
</script>
