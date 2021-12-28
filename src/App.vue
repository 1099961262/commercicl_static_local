<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "../src/assets/style/global.less";

export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
};
</script>

<style lang="less">
#app,
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.amap-logo {
  display: none !important;
  visibility: hidden !important;
}

.amap-copyright {
  display: none !important;
  visibility: hidden !important;
}
</style>
