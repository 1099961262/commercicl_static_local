<template>
  <div class="person-profile">
    <div class="title">
      <img
        src="@assets/img/zhengtitubiaosvg_renkou_blue.png"
        class="title-img img-one"
      />
      <span>人口规模</span>
    </div>
    <div class="context-box">
      <div class="context-left">
        <div class="line"></div>
        <div class="item-box item-top">
          <div class="context-left-item">
            <div class="left-item-box">
              <div class="left-item-bot-title">2250000㎡</div>
              <div>点位面积</div>
            </div>
          </div>
          <div class="context-left-item">
            <div class="left-item-box">
              <div class="left-item-bot-title">7.8万人</div>
              <div>居住用户</div>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="context-left-item">
            <div class="left-item-box">
              <div class="left-item-bot-title">6.5万人</div>
              <div>工作用户</div>
            </div>
          </div>
          <div class="context-left-item">
            <div class="left-item-box">
              <div class="left-item-bot-title">1100p/km²</div>
              <div>人口密度(居住用户)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="context-right">
        <div class="context-right-cont">
          <div class="context-right-cont-title">高10%</div>
          <div>相比周边平均密度</div>
        </div>
      </div>
    </div>
    <!-- 客流趋势 -->
    <div v-if="typeDrawer == 'assessmentReport'">
      <div class="title">
        <img
          src="@assets/img/zijinshouzhiqushifenxi.png"
          class="title-img img-two"
        />
        <span>客流趋势</span>
      </div>
      <div class="crowd-content">
        <div class="echarts-title">当月新增客流: 500人</div>
        <div class="echarts" ref="proportionConsumption"></div>
      </div>
    </div>
    <!-- 人口流动性 -->
    <div v-if="typeDrawer == 'recommendReport'">
      <div class="title">
        <img src="@assets/img/shiyourenkou.png" class="title-img img-two" />
        <span>人口流动性</span>
      </div>
      <div class="crowd-content">
        <div class="echarts" ref="ageDistribution"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "PersonProfile",
  props: ["typeDrawer"],
  components: {},
  data() {
    return {
      proportionConsumptionEchart: "",
      ageDistributionEchart: "", //人口流动性
    };
  },
  mounted() {
    if (this.typeDrawer == "assessmentReport") {
      // 初始化echarts
      this.proportionConsumptionEchart = echarts.init(
        this.$refs.proportionConsumption
      );
      // 显示
      this.setProportionConsumptionEchart();
    } else if (this.typeDrawer == "recommendReport") {
      this.ageDistributionEchart = echarts.init(this.$refs.ageDistribution); //人口流动性
      this.setAgeDistributionEchart(); //人口流动性
    }
  },
  methods: {
    setProportionConsumptionEchart() {
      let option = {
        color: "#BCF5AB",
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          // type: "value",
          boundaryGap: true,
          data: ["4月", "5月", "6月", "7月", "8月", "9月"],
          axisLine: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisPointer: {
            lineStyle: {
              color: "#57C83E",
            },
          },
        },

        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 726, 857, 933],
            type: "line",
            // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            // symbol: "roundRect",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(188,245,171, 1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(188,245,171, 0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(255,255,255, 0.5)",
                },
              ]),
            },
          },
        ],
      };
      this.proportionConsumptionEchart.setOption(option);
    },
    // 人口流动性
    setAgeDistributionEchart() {
      let option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "人口流动性",
            type: "pie",
            radius: ["50%", "70%"],
            data: [
              { value: 1048, name: "流动人口为主" },
              { value: 735, name: "流动人口非常多" },
              { value: 580, name: "流动人口较多" },
              { value: 484, name: "较为稳定" },
              { value: 300, name: "稳定性一般" },
              { value: 600, name: "人员非常稳定" },
            ],
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: "#fff",
            },
            label: {
              // formatter: "{b}：{d}% ",
              formatter: "{b}",
            },
          },
        ],
      };
      this.ageDistributionEchart.setOption(option);
    },
  },
};
</script>
<style lang="less" scope>
.person-profile {
  .title {
    line-height: 40px;
    padding-left: 30px;
    text-align: left;
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: #747474;
    border-bottom: 1px solid #f5f5f5;
    .title-img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .title-img-one {
      width: 17px;
      height: 12px;
    }
    .img-two {
      width: 18px;
      height: 13px;
    }
  }
  .context-box {
    display: flex;
    justify-content: space-between;
    padding: 29px 0 40px;
    .context-left {
      width: 64%;
      height: 158px;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
      padding: 14px 10px;
      position: relative;
      .line {
        width: 1px;
        height: 130px;
        background-color: #f5f5f5;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .item-top {
        border-bottom: 1px solid #f5f5f5;
      }
      .item-box {
        width: 100%;
        height: 65px;
        display: flex;
        justify-content: space-between;
        .context-left-item {
          width: 50%;
          position: relative;
          .left-item-box {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #747474;
            .left-item-bot-title {
              margin-bottom: 10px;
              text-align: center;
              font-size: 16px;
              color: #747474;
            }
          }
        }
      }
    }
    .context-right {
      width: 34%;
      background: #f1faff;
      border-radius: 4px;
      border: 1px solid #d1d1d1;
      position: relative;
      .context-right-cont {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #28afff;
        .context-right-cont-title {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          margin-bottom: 10px;
          color: #747474;
        }
      }
    }
  }

  .crowd-content {
    padding-top: 40px;
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
  }
}
</style>
