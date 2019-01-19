<template>
  <div id="app">
    <Header />
    <HeaderSwitch />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header';
import HeaderSwitch from './components/HeaderSwitch';

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
