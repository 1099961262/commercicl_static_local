<template>
  <div class="app-like">
    <div class="title">
      <span>行业使用量TOP10</span>
    </div>
    <div class="industry-top">
      <!-- size="small" -->
      <!-- v-loading="LoadingStatus"  -->
      <el-table
        ref="multipleTable"
        stripe
        size="mini"
        :data="sourceTopListData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="600px"
        :header-cell-style="{
          background: '#E3F7FF',
          color: '#777777',
          fontWeight: '500',
          textAlign: 'center',
        }"
        :cell-style="{ textAlign: 'center', fontWeight: '500' }"
      >
        <el-table-column show-overflow-tooltip label="排名">
          <template slot-scope="scope">
            <span
              :class="[
                { redColor: scope.$index + 1 == 1 },
                { blueColor: scope.$index + 1 == 2 },
                { orangeColor: scope.$index + 1 == 3 },
              ]"
              >{{ `TOP${scope.$index + 1}` }}</span
            >
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="所属行业" />
        <el-table-column
          show-overflow-tooltip
          prop="coverage"
          label="流量占比"
        />
      </el-table>
    </div>

    <div class="crowd-content">
      <div class="title">
        <span>日均上网时长</span>
      </div>
      <div class="echarts" ref="internetProportion"></div>
    </div>
    <div class="crowd-content">
      <div class="title">
        <span>重度使用用户占比 (按使用时长)</span>
      </div>
      <div class="select-box">
        <el-select value="1" placeholder="请选择" class="topSelect">
          <el-option value="1" label="游戏类"></el-option>
          <el-option value="2" label="短视频类"></el-option>
          <el-option value="3" label="购物类"></el-option>
          <el-option value="4" label="社交类"></el-option>
          <el-option value="5" label="运动类"></el-option>
        </el-select>
      </div>
      <div class="echarts" ref="useProportion"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "AppLike",
  props: [],
  components: {},
  data() {
    return {
      proportionConsumptionEchart: "",
      sourceTopListData: [],
      internetProportionEchart: "",
      useProportionEchart: "",
    };
  },
  created() {
    //来源TOP
    this.sourceTopListData = [
      { name: "公共流量", coverage: "21%" },
      { name: "实用工具", coverage: "17%" },
      { name: "商城", coverage: "14%" },
      { name: "视频", coverage: "9%" },
      { name: "新闻资讯", coverage: "5.6%" },
      { name: "短视频", coverage: "4.8%" },
      { name: "地图导航", coverage: "3.5%" },
      { name: "应用市场", coverage: "1.7%" },
      { name: "社交聊天", coverage: "1.5%" },
      { name: "音乐", coverage: "1.2%" },
    ];
  },
  mounted() {
    // 初始化echarts

    this.internetProportionEchart = echarts.init(this.$refs.internetProportion);
    this.useProportionEchart = echarts.init(this.$refs.useProportion);
    // 显示
    this.setInternetProportionEchart();
    this.setUseProportionEchart();
  },
  methods: {
    setInternetProportionEchart() {
      let option = {
        // title: {
        //   text: "上网时长",
        //   left: "center",
        // },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "value",
          spiltLine: {
            show: true, //想要不显示网格线，改为false
          },
        },
        grid: {
          left: 100,
          containLabel: false,
        },
        yAxis: {
          type: "category",
          data: [
            "12小时以上",
            "11-12小时",
            "9-10小时",
            "7-8小时",
            "4-6小时",
            "小于4小时",
          ],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            // alignWithLabel: true,
          },
          spiltLine: {
            show: true, //想要不显示网格线，改为false
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: "bar",
          },
        ],
      };
      this.internetProportionEchart.setOption(option);
    },
    setUseProportionEchart() {
      let option = {
        backgroundColor: "#fff",
        title: {
          text: "4小时/6小时/8小时以上人数占比",
          left: "center",
          bottom: 0,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },

        series: [
          {
            name: "人数占比",
            type: "pie",
            radius: ["50%", "70%"],
            data: [
              { value: 1048, name: "4小时以下" },
              { value: 735, name: "4-6小时" },
              { value: 580, name: "6-8小时" },
              { value: 484, name: "8小时以上" },
            ],
            label: {
              show: false,
            },
          },
        ],
      };
      this.useProportionEchart.setOption(option);
    },
  },
};
</script>
<style lang="less" scope>
.app-like {
  .title {
    line-height: 40px;
    padding-left: 30px;
    text-align: left;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #747474;
    border-bottom: 1px solid #f5f5f5;
  }
  .industry-top {
    padding-top: 20px;
    .redColor {
      color: #e33d3d;
    }
    .blueColor {
      color: #3da0e3;
    }
    .orangeColor {
      color: #e3813d;
    }
  }
  .crowd-content {
    padding-top: 30px;
    .echarts-title {
      width: 100%;
      text-align: right;
      font-size: 14px;
      font-weight: 500;
      color: #646464;
    }
    .echarts {
      width: 460px;
      height: 300px;
    }
    .select-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>
