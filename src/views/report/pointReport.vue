<!-- 点位评估报告 -->
<template>
  <div class="main">
    <div class="map" id="map"></div>
    <!-- 顶部吸顶 -->
    <div class="fix-top">
      <div class="fix-title">室内滑雪新店 点位评估报告</div>
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
        客流价值
      </div>
      <div
        class="left-menu-item"
        :class="menuActive == '2' ? 'active' : ''"
        @click="changeMenu('2')"
      >
        配套信息
      </div>
      <div
        class="left-menu-item"
        :class="menuActive == '3' ? 'active' : ''"
        @click="changeMenu('3')"
      >
        交通状况
      </div>
    </div>
    <!-- 抽屉 -->

    <!-- 客流价值 -->
    <PassengerDrawer
      v-if="passengerDrawer"
      :visible="passengerDrawer"
      typeDrawer="assessmentReport"
      :onCancel="() => change('passengerDrawer')"
      :showhot="(value) => cahngeHoT(value)"
    ></PassengerDrawer>
    <!-- 配套信息 -->
    <PatchingDrawer
      v-if="patchingDrawer"
      :visible="patchingDrawer"
      :onCancel="() => change('patchingDrawer')"
    ></PatchingDrawer>
    <!-- 交通状况 -->
    <TrafficDrawer
      v-if="trafficDrawer"
      :visible="trafficDrawer"
      :onCancel="() => change('trafficDrawer')"
    ></TrafficDrawer>

    <!-- 人群分布热力图开关 -->
    <div class="switch-box" v-show="showHotButton">
      <div class="switch-box-title switch-margin">人群分布热力图</div>
      <div class="switch-margin">
        <el-switch v-model="juzhu" active-text="居住客群" @change="cahngejuzu">
        </el-switch>
      </div>
      <div>
        <el-switch
          v-model="bangong"
          active-text="办公客群"
          @change="cahngebangong"
        >
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import PassengerDrawer from "./commen/PassengerDrawer.vue";
import PatchingDrawer from "./commen/PatchingDrawer.vue"; //配套信息
import TrafficDrawer from "./commen/TrafficDrawer.vue"; //交通状况
import axios from "axios";
let map;
let heatmap;
export default {
  components: {
    PassengerDrawer,
    PatchingDrawer,
    TrafficDrawer,
  },
  data() {
    return {
      menuActive: "1", //左侧菜单选中
      passengerDrawer: false, //客流价值抽屉显示控制
      patchingDrawer: false, //配套信息抽屉显示控制
      trafficDrawer: false, //交通状况抽屉显示控制

      showHotButton: false,

      bangong: true,
      juzhu: false,
      heatmapData: [], //工作
      heatmapDataTwo: [], //居住
    };
  },
  created() {
    this.changeDrawer();
  },
  mounted() {
    // 初始化地图
    map = new AMap.Map("map", {
      // center: [116.191031, 39.988585],
      center: ["116.527139", "39.951948"],
      zoom: 13,
      mapStyle: "amap://styles/light",
    });
    // 构造矢量圆形
    var circle = new AMap.Circle({
      center: new AMap.LngLat("116.527139", "39.951948"), // 圆心位置
      radius: 3000, //半径
      strokeColor: "#108ee9", //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 2, //线粗细度
      fillColor: "#108ee9", //填充颜色
      fillOpacity: 0.1, //填充透明度
    });
    map.add(circle);
    map.plugin(["AMap.Heatmap"], function () {
      //初始化heatmap对象
      heatmap = new AMap.Heatmap(map, {
        radius: 25, //给定半径
        opacity: [0, 0.8],
      });
    });
    // / { lng: 116.191031, lat: 39.988585, count: 10 },
    // 工作
    axios.get("/js/work.json").then((res) => {
      if (res.status == 200) {
        let arr = res.data.map((item) => {
          return {
            lng: item.lng,
            lat: item.lat,
            count: item.num,
          };
        });
        this.heatmapData = arr;
      }
      // 居住
      axios.get("/js/juzu.json").then((res) => {
        if (res.status == 200) {
          let arr = res.data.map((item) => {
            return {
              lng: item.lng,
              lat: item.lat,
              count: item.num,
            };
          });
          this.heatmapDataTwo = arr;
        }
        this.cahngebangong(true);
      });
    });
  },
  methods: {
    cahngejuzu(e) {
      if (e) {
        heatmap.setDataSet({
          data: this.heatmapData,
          max: 100,
        });
        this.bangong = false;
      } else {
        if (this.bangong) {
          heatmap.setDataSet({
            data: this.heatmapDataTwo,
            max: 100,
          });
        } else {
          heatmap.setDataSet({
            data: [],
            max: 100,
          });
        }
      }
    },
    cahngebangong(e) {
      if (e) {
        heatmap.setDataSet({
          data: this.heatmapDataTwo,
          max: 100,
        });
        this.juzhu = false;
      } else {
        if (this.juzhu) {
          heatmap.setDataSet({
            data: this.heatmapDataTwo,
            max: 100,
          });
        } else {
          heatmap.setDataSet({
            data: [],
            max: 100,
          });
        }
      }
    },
    cahngeHoT(value) {
      this.showHotButton = value;
    },
    change(mode) {
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
          this.passengerDrawer = true;
          this.patchingDrawer = false;
          this.trafficDrawer = false;
          this.cahngeHoT(true);
          break;
        case "2":
          this.passengerDrawer = false;
          this.patchingDrawer = true;
          this.trafficDrawer = false;
          this.cahngeHoT(false);
          break;
        case "3":
          this.patchingDrawer = false;
          this.passengerDrawer = false;
          this.trafficDrawer = true;
          this.cahngeHoT(false);
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
    z-index: 3;
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
