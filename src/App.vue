<template>
  <div id="app">
    <Header />
    <HeaderSwitch />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import HeaderSwitch from './components/HeaderSwitch.vue';

export default {
  name: 'App',
  components: {
    Header,
    HeaderSwitch,
  },
  data() {
    return {
      device: 'desktop',
    };
  },
};
</script>

<style lang="scss">
   @import 'screen.scss'
</style>
