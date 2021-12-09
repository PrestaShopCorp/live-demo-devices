<template>
  <div id="app">
    <DemoHeader />
    <HeaderSwitch />
    <router-view/>
  </div>
</template>

<script>
import DemoHeader from './components/DemoHeader.vue';
import HeaderSwitch from './components/HeaderSwitch.vue';

export default {
  name: 'App',
  components: {
    DemoHeader,
    HeaderSwitch,
  },
};
</script>

<style lang="scss">
   @import 'screen.scss'
</style>
