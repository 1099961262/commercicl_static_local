<template>
  <el-drawer
    :visible="visible"
    :modal="false"
    :with-header="false"
    class="drawerBox"
    :size="drawerSize"
    @close="onCancel"
  >
    <div
      class="drawer-content"
      :class="activeName == 'second' ? 'backgorund' : ''"
    >
      <div class="passenger-box">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane label="人口概况" name="first"> </el-tab-pane>
          <el-tab-pane label="客群画像" name="second"> </el-tab-pane>
          <el-tab-pane label="APP偏好" name="third"> </el-tab-pane>
        </el-tabs>
        <PersonProfile
          v-if="activeName == 'first'"
          :typeDrawer="typeDrawer"
        ></PersonProfile>
        <PeoplePic v-if="activeName == 'second'"></PeoplePic>
        <AppLike v-if="activeName == 'third'"></AppLike>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import PersonProfile from "./passengerDrawerCommon/PersonProfile.vue";
import AppLike from "./passengerDrawerCommon/AppLike.vue";
import PeoplePic from "./passengerDrawerCommon/PeoplePic.vue";

export default {
  name: "PassengerDrawer",
  props: ["visible", "typeDrawer", "onCancel", "showhot"],
  components: { PersonProfile, AppLike, PeoplePic },
  data() {
    return {
      drawerSize: 500, //抽屉宽度
      activeName: "first", //tabs切换
    };
  },
  created() {
    this.activeName = "first";
  },
  methods: {
    aaa() {
      this.onCancel();
    },
    // 切换tab的方法
    handleClick(tab, event) {
      if (tab.name == "second") {
        this.drawerSize = "100%";
        this.showhot(false);
      } else {
        this.drawerSize = 500;
        this.showhot(true);
      }
    },
  },
};
</script>
<style lang="less" scope>
.drawerBox {
  position: absolute !important;
  z-index: 2 !important;
}
.drawer-content {
  padding-top: 59px;
  position: relative;
}
.backgorund {
  background-color: #f6f6f6;
}

.passenger-box {
  padding: 0 20px;
}

.el-tabs__nav-wrap {
  background-color: #fff;
}
</style>
