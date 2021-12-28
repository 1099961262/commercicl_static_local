<!-- 推荐指数报告 -->
<template>
  <div class="main">
    <div class="map" id="map"></div>
    <!-- 顶部吸顶 -->
    <div class="fix-top">
      <div class="fix-title">一公里社区店选址预选 推荐指数报告</div>
      <div class="fix-date">数据范围：2021-09</div>
      <div class="back-but" @click="goBack">返回</div>
    </div>
    <!-- 左侧菜单 -->
    <div class="left-menu">
      <div
        class="left-menu-item"
        :class="menuActive == '1' ? 'active' : ''"
        @click="changeMenu('1')"
      >
        点位总览
      </div>
      <div
        class="left-menu-item"
        :class="menuActive == '2' ? 'active' : ''"
        @click="changeMenu('2')"
      >
        客流价值
      </div>
      <div
        class="left-menu-item"
        :class="menuActive == '3' ? 'active' : ''"
        @click="changeMenu('3')"
      >
        配套信息
      </div>
      <div
        class="left-menu-item"
        :class="menuActive == '4' ? 'active' : ''"
        @click="changeMenu('4')"
      >
        交通状况
      </div>
    </div>
    <!-- 抽屉 -->
    <!-- 点位总览 -->
    <PointDrawer
      v-show="pointDrawer"
      :visible="pointDrawer"
      :onCancel="() => change('pointDrawer')"
    ></PointDrawer>
    <!-- 客流价值 -->
    <PassengerDrawer
      v-show="passengerDrawer"
      :visible="passengerDrawer"
      typeDrawer="recommendReport"
      :onCancel="() => change('passengerDrawer')"
    ></PassengerDrawer>
    <!-- 配套信息 -->
    <PatchingDrawer
      v-show="patchingDrawer"
      :visible="patchingDrawer"
      :onCancel="() => change('patchingDrawer')"
    ></PatchingDrawer>
    <!-- 交通状况 -->
    <TrafficDrawer
      v-show="trafficDrawer"
      :visible="trafficDrawer"
      :onCancel="() => change('trafficDrawer')"
    ></TrafficDrawer>
    <!-- 人群分布热力图开关 -->
    <!-- <div class="switch-box" v-show="passengerDrawer">
      <div class="switch-box-title switch-margin">人群分布热力图</div>
      <div class="switch-margin">
        <el-switch :value="true" inactive-text="居住客群"> </el-switch>
      </div>
      <div>
        <el-switch :value="false" inactive-text="办公客群"> </el-switch>
      </div>
    </div> -->
  </div>
</template>

<script>
import PointDrawer from "./commen/PointDrawer.vue";
import PassengerDrawer from "./commen/PassengerDrawer.vue";
import PatchingDrawer from "./commen/PatchingDrawer.vue"; //配套信息
import TrafficDrawer from "./commen/TrafficDrawer.vue"; //交通状况
import maker_red from "@/assets/img/maker_red.png";
let map;

export default {
  components: {
    PointDrawer,
    PassengerDrawer,
    PatchingDrawer,
    TrafficDrawer,
  },
  data() {
    return {
      menuActive: "1", //左侧菜单选中
      pointDrawer: false, //点位总览抽屉显示控制
      passengerDrawer: false, //客流价值抽屉显示控制
      patchingDrawer: false, //配套信息抽屉显示控制
      trafficDrawer: false, //交通状况抽屉显示控制
    };
  },
  created() {
    this.changeDrawer();
  },
  mounted() {
    // 初始化地图
    map = new AMap.Map("map", {
      // center: [116.191031, 39.988585],
      center: [116.374062, 39.91056],
      zoom: 13,
      mapStyle: "amap://styles/light",
    });

    new AMap.Marker({
      position: new AMap.LngLat(116.374062, 39.910567),
      icon: maker_red,
      map: map,
      zIndex: 105,
    });
  },
  methods: {
    change(mode) {
      if (mode == "pointDrawer") {
        this.pointDrawer = false;
      }
      if (mode == "passengerDrawer") {
        this.passengerDrawer = false;
      }
      if (mode == "patchingDrawer") {
        this.patchingDrawer = false;
      }
      if (mode == "trafficDrawer") {
        this.trafficDrawer = false;
      }
    },

    // 切换抽屉
    changeDrawer() {
      switch (this.menuActive) {
        case "1":
          this.pointDrawer = true;
          this.passengerDrawer = false;
          this.patchingDrawer = false;
          this.trafficDrawer = false;
          break;
        case "2":
          this.passengerDrawer = true;
          this.pointDrawer = false;
          this.patchingDrawer = false;
          this.trafficDrawer = false;
          break;
        case "3":
          this.patchingDrawer = true;
          this.pointDrawer = false;
          this.passengerDrawer = false;
          this.trafficDrawer = false;
          break;
        case "4":
          this.trafficDrawer = true;
          this.pointDrawer = false;
          this.passengerDrawer = false;
          this.patchingDrawer = false;
          break;
      }
    },
    // 切换左侧菜单
    changeMenu(menu) {
      this.menuActive = menu;
      this.changeDrawer();
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
  }
  .fix-top {
    width: 100%;
    background-color: rgba(22, 44, 105, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    .fix-title {
      width: 100%;
      height: 59px;
      line-height: 59px;
      text-align: center;
      font-size: 22px;
      color: #ffffff;
    }
    .fix-date {
      height: 59px;
      line-height: 59px;
      position: absolute;
      right: 170px;
      top: 0;
      font-size: 22px;
      color: #ffffff;
    }
    .back-but {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      padding: 8px 15px;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      background-color: #1b3581;
      font-size: 16px;
      cursor: pointer;
    }
  }
  .left-menu {
    width: 110px;
    background-color: rgba(101, 115, 156, 0.5);
    position: absolute;
    left: 0;
    top: 185px;
    z-index: 3;
    .left-menu-item {
      width: 100%;
      height: 47px;
      line-height: 47px;
      font-size: 16px;
      color: #092551;
      text-align: center;
      cursor: pointer;
    }
    .left-menu-item:hover {
      background-color: rgba(101, 115, 156, 0.8);
      color: #ffffff;
    }
    .active {
      background-color: rgba(101, 115, 156, 0.8);
      color: #ffffff;
    }
  }
  .switch-box {
    // width: 531px;
    // height: 59px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.32);
    border-radius: 1px;
    position: absolute;
    top: 110px;
    right: 520px;
    display: flex;
    justify-content: space-between;
    .switch-box-title {
      font-size: 16px;
      font-weight: 500;
      color: #646464;
    }
    .switch-margin {
      margin-right: 20px;
    }
  }
}
</style>
