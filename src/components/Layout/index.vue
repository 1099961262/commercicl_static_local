<template>
  <div class="layout">
    <LayoutHeader :layoutMode="layoutMode"></LayoutHeader>
    <!-- <LayoutHeader></LayoutHeader> -->
    <div class="layout-box">
      <LeftMenu v-show="layoutMode == 'left'"></LeftMenu>
      <!-- <LeftMenu></LeftMenu> -->
      <RightMain></RightMain>
    </div>
  </div>
</template>

<script>
import RightMain from "./RightMain.vue";
import LayoutHeader from "./LayoutHeader.vue";
import LeftMenu from "./LeftMenu.vue";
import local from "@utils/local";

export default {
  data() {
    return {
      layoutMode: "top",
    };
  },
  components: {
    RightMain,
    LayoutHeader,
    LeftMenu,
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      if (to.path == "/personal_data" || to.path == "/log_center") {
        this.layoutMode = "left";
      } else {
        this.layoutMode = "top";
      }
      local.set("activeRouter", to.path);
    },
  },
  created() {
    let activeRouter = local.get("activeRouter");
    if (activeRouter == "/personal_data" || activeRouter == "/log_center") {
      this.layoutMode = "left";
    } else {
      this.layoutMode = "top";
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  .layout-box {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
  }
}
</style>
