<template>
  <div class="people-pic">
    <!--1 -->
    <div class="crowd-box">
      <div class="crowd-content">
        <div class="crowd-content-item">
          <!-- 年龄分布 -->
          <div class="echarts" ref="ageDistribution"></div>
        </div>
        <div class="crowd-content-item">
          <!-- 性别占比 -->
          <div class="echarts" ref="sexRatio"></div>
        </div>
        <div class="crowd-content-item">
          <!-- 终端品牌用户占比 -->
          <div class="echarts" ref="proportionBrands"></div>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="crowd-box">
      <div class="crowd-content">
        <div class="crowd-content-item-two">
          <!-- 区域用户在网时长 -->
          <div class="echarts" ref="onLineTime"></div>
        </div>
        <div class="crowd-content-item-two">
          <!-- 话费消费档次 -->
          <div class="echarts" ref="proportionConsumption"></div>
        </div>
      </div>
    </div>
    <!-- 3 -->
    <div class="crowd-box">
      <div class="crowd-content">
        <div class="crowd-content-item">
          <!-- 手机上网流量占比 -->
          <div class="echarts" ref="flowRatio"></div>
        </div>
        <div class="crowd-content-item">
          <!-- 户籍来源分布 -->
          <div class="echarts" ref="sourceDistribution"></div>
        </div>
        <div class="crowd-content-item">
          <!-- 来源TOP -->
          <div class="item-two-list-title">
            来源TOP10省市
            <el-select
              value="1"
              placeholder="请选择"
              class="topSelect"
              size="small"
            >
              <el-option value="1" label="按省"></el-option>
              <el-option value="2" label="按市"></el-option>
            </el-select>
          </div>
          <div class="item-two-list">
            <!-- v-loading="LoadingStatus" -->
            <el-table
              ref="multipleTable"
              stripe
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
              <el-table-column show-overflow-tooltip prop="name" label="名称" />
              <el-table-column
                show-overflow-tooltip
                prop="number"
                label="人数"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "PeoplePic",
  props: [],
  components: {},
  data() {
    return {
      ageDistributionEchart: "", //年龄分布
      sexRatioEchart: "", //性别占比
      proportionBrandsEchart: "", //终端品牌用户占比
      onLineTimeEchart: "", //区域用户在网时长
      proportionConsumptionEchart: "", //话费消费档次
      flowRatioEchart: "", //手机上网流量占比
      sourceDistributionEchart: "", //户籍来源分布
      sourceTopListData: [], //来源TOP
    };
  },
  created() {
    //来源TOP
    this.sourceTopListData = [
      {
        name: "浙江省",
        number: "6789",
        coverage: "30%",
      },
      {
        name: "四川省",
        number: "5982",
        coverage: "26%",
      },
      {
        name: "河南省",
        number: "5523",
        coverage: "22%",
      },
      {
        name: "山西省",
        number: "4956",
        coverage: "18%",
      },
      {
        name: "山东省",
        number: "4005",
        coverage: "15%",
      },
    ];
  },
  mounted() {
    // 初始化echarts

    this.ageDistributionEchart = echarts.init(this.$refs.ageDistribution); //年龄分布
    this.sexRatioEchart = echarts.init(this.$refs.sexRatio); //性别占比
    this.proportionBrandsEchart = echarts.init(this.$refs.proportionBrands); //终端品牌用户占比

    this.onLineTimeEchart = echarts.init(this.$refs.onLineTime); //区域用户在网时长
    this.proportionConsumptionEchart = echarts.init(
      this.$refs.proportionConsumption
    ); //话费消费档次

    this.flowRatioEchart = echarts.init(this.$refs.flowRatio); //手机上网流量占比
    this.sourceDistributionEchart = echarts.init(this.$refs.sourceDistribution); //户籍来源分布

    // 显示
    this.setAgeDistributionEchart(); //年龄分布
    this.setSexRatioEchart(); //性别占比
    this.setOnLineTimeEchartt(); //区域用户在网时长

    this.setProportionBrandsEchart(); //终端品牌用户占比
    this.setFlowRatioEchart(); //手机上网流量占比
    this.setProportionConsumptionEchart(); //区域用户在网时长
    this.setSourceDistributionEchart(); //户籍来源分布
  },
  methods: {
    // 年龄分布
    setAgeDistributionEchart() {
      let option = {
        backgroundColor: "#fff",
        title: {
          text: "年龄分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },

        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: ["50%", "70%"],
            data: [
              { value: 1048, name: "0-15岁" },
              { value: 735, name: "16-31岁" },
              { value: 580, name: "32-47岁" },
              { value: 484, name: "48-53岁" },
              { value: 300, name: "54岁以上" },
            ],
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: "#fff",
            },
            label: {
              formatter: "{b}：{d}% ",
            },
          },
        ],
      };
      this.ageDistributionEchart.setOption(option);
    },
    // 性别占比
    setSexRatioEchart() {
      let option = {
        color: ["#30D5FF", "#FF9C9C"],
        backgroundColor: "#fff",
        title: {
          text: "性别占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },

        series: [
          {
            name: "性别占比",
            type: "pie",
            radius: "70%",
            data: [
              { value: 735, name: "女" },
              { value: 1048, name: "男" },
            ],
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: "#fff",
            },
            label: {
              position: "inner",
              fontSize: 14,
              color: "#fff",
              formatter: "{b}：{d}% ",
            },
          },
        ],
      };
      this.sexRatioEchart.setOption(option);
    },
    // 区域用户在网时长
    setOnLineTimeEchartt() {
      let option = {
        title: {
          text: "区域用户在网时长",
          left: "center",
        },
        color: ["#B5E1BA"],
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["小于1年", "1-2年", "2-3年", "3-4年", "4-5年", "5年及以上"],
          axisLine: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 50],
            type: "bar",
            barMaxWidth: "26px",
            emphasis: {
              itemStyle: {
                color: "#37ADBA",
              },
            },
          },
        ],
      };
      this.onLineTimeEchart.setOption(option);
    },
    // 终端品牌用户占比
    setProportionBrandsEchart() {
      let option = {
        title: {
          text: "终端品牌用户占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },

        series: [
          {
            name: "终端品牌用户占比",
            type: "pie",
            radius: "70%",
            data: [
              { value: 1048, name: "小米用户" },
              { value: 580, name: "三星用户" },
              { value: 484, name: "vivo用户" },
              { value: 300, name: "苹果用户" },
              { value: 1102, name: "华为用户" },
            ],
            label: {
              formatter: "{b}：{d}% ",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.proportionBrandsEchart.setOption(option);
    },
    // 手机上网流量占比
    setFlowRatioEchart() {
      let data = [
        { value: 1048, name: "0-50M" },
        { value: 1580, name: "51-100M" },
        { value: 1484, name: "101M-500M" },
        { value: 1300, name: "501M-1G" },
        { value: 1102, name: "1G-5G" },
        { value: 2000, name: "6G-10G" },
        { value: 2500, name: "11G-20G" },
        { value: 2600, name: "20G以上" },
      ];
      let sum = eval(data.map((item) => item.value).join("+"));
      let addUp = 0;
      let minHeight = 2; //最小高度
      let top = 5;
      data = data.map((item) => {
        let itemValue = 0;
        if ((item.value / sum) * 100 < minHeight) itemValue = minHeight;
        else itemValue = (item.value / sum) * 100;
        top += itemValue;
        return {
          value: (addUp += itemValue),
          name: item.name,
          realValue: item.value,
          valueProportion: itemValue.toFixed(2),
          itemStyle: {
            height: `${itemValue}%`,
          },
        };
      });
      let option = {
        title: {
          text: "手机上网流量占比",
          left: "center",
        },
        color: ["#8F4630", "#A48AED", "#EDAD8A", "#8AD0ED", "#FF9696"],
        series: [
          {
            type: "funnel",
            sort: "ascending",
            top: `${top - 93}%`,
            label: {
              formatter: (res) => {
                return `${res.data.name}:  ${res.data.valueProportion} %`;
              },
              overflow: "break",
            },

            data,
            // markLine: {
            //   symbol: "none",
            //   lineStyle: { type: "solid" },
            //   data: [
            //     [
            //       {
            //         x: 0,
            //         y: 0,
            //       },
            //       {
            //         x: 100,
            //         y: 100,
            //       },
            //     ],
            //   ],
            // },
          },
        ],
      };
      this.flowRatioEchart.setOption(option);
    },
    // 话费消费档次
    setProportionConsumptionEchart() {
      let option = {
        title: {
          text: "话费消费档次",
          left: "center",
        },
        color: "#BCF5AB",
        tooltip: {
          show: true,
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          // type: "value",
          boundaryGap: true,
          data: ["低消费", "较低消费", "中等消费", "中高消费", "高消费"],
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
            data: [820, 932, 901, 852, 730],
            type: "line",
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
    // 户籍来源分布
    setSourceDistributionEchart() {
      let dataMap = [
        { name: "南海诸岛", value: 0 },
        { name: "北京", value: 100 },
        { name: "天津", value: 100 },
        { name: "上海", value: 110 },
        { name: "重庆", value: 55 },
        { name: "河北", value: 65 },
        { name: "河南", value: 45 },
        { name: "云南", value: 85 },
        { name: "辽宁", value: 65 },
        { name: "黑龙江", value: 75 },
        { name: "湖南", value: 35 },
        { name: "安徽", value: 45 },
        { name: "山东", value: 45 },
        { name: "新疆", value: 0 },
        { name: "江苏", value: 45 },
        { name: "浙江", value: 45 },
        { name: "江西", value: 35 },
        { name: "湖北", value: 45 },
        { name: "广西", value: 110 },
        { name: "甘肃", value: 55 },
        { name: "山西", value: 45 },
        { name: "内蒙古", value: 65 },
        { name: "陕西", value: 45 },
        { name: "吉林", value: 65 },
        { name: "福建", value: 110 },
        { name: "贵州", value: 55 },
        { name: "广东", value: 110 },
        { name: "青海", value: 45 },
        { name: "西藏", value: 35 },
        { name: "四川", value: 100 },
        { name: "宁夏", value: 55 },
        { name: "海南", value: 55 },
        { name: "台湾", value: 55 },
        { name: "香港", value: 110 },
        { name: "澳门", value: 110 },
      ];
      const geoJson = require("@/assets/echarts/china.json");
      echarts.registerMap("china", { geoJSON: geoJson });
      let option = {
        title: {
          text: "户籍来源分布",
          left: "center",
        },
        tooltip: {
          formatter: function (e) {
            return e.name + "：" + e.value;
          },
        },
        grid: {
          //   left: "10%",
          //   right: "10%",
          //   containLabel: true,
          left: 40,
          bottom: 30,
          right: 10,
          containLabel: false,
        },
        visualMap: {
          type: "piecewise", // 定义为分段型 visualMap
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: true,
          text: ["高", "低"],
          pieces: [
            { gt: 100, label: "> 100人", color: "#CF2E10" },
            { gte: 90, lte: 100, label: "90-100人", color: "#FF9B37" },
            { gte: 80, lt: 90, label: "80-90人", color: "#FFDB37" },
            { gte: 70, lt: 80, label: "70-80人", color: "#6AD3EB" },
            { gte: 60, lt: 70, label: "60-70人", color: "#15A9CB" },
            { gte: 50, lt: 60, label: "50-60人", color: "#61A6FF" },
            { gte: 40, lt: 50, label: "40-50人", color: "#2376E1" },
            { gte: 30, lt: 40, label: "30-40人", color: "#074AA2" },
            { gte: 0, lt: 40, label: "0-30人", color: "#1F4F8E" },
          ],
          show: false,
        },
        geo: {
          map: "china",
          roam: false,
          layoutCenter: ["50%", "50%"],
          layoutSize: "100%",
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.23,
          top: 120,
          label: {
            normal: {
              show: true,
              fontSize: "14",
              color: "#000",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
          },
        },
        series: [
          {
            name: "来源",
            type: "map",
            geoIndex: 0,
            data: dataMap,
          },
        ],
      };
      this.sourceDistributionEchart.setOption(option);
    },
  },
};
</script>
<style lang="less" scope>
.people-pic {
  padding-bottom: 20px;
  //人群画像
  .crowd-box {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    .crowd-content {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .crowd-content-item {
        width: 33%;
        height: 384px;
        border-left: 1px solid #e5e5e5;
      }
      .crowd-content-item-two {
        width: 50%;
        height: 384px;
        border-left: 1px solid #e5e5e5;
      }
      .echarts {
        width: 100%;
        height: 100%;
      }
      .item-two-list-title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        position: relative;
        margin-bottom: 40px;
      }
      .topSelect {
        width: 100px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .item-two-list {
        padding-left: 20px;
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
      .targetHeight {
        height: 240px;
      }
      .crowd-content-item-two:first-child {
        border: none;
      }
      .crowd-content-item:first-child {
        border: none;
      }
    }
    .content-item-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      line-height: 22px;
    }
    .content-tite-but {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      border: none;
    }
    .tite-bu-box {
      display: flex;
    }
    .tite-but {
      margin-right: 14px;
      padding: 5px 15px;
      border-radius: 3px;
      font-size: 14px;
      color: #b7b7b7;
      border: 1px solid #e0e0e0;
      cursor: pointer;
    }
    .tite-but:hover {
      color: #fff;
      background-color: #3aa0ff;
      border: 1px solid #3aa0ff;
    }
    .active {
      color: #fff;
      background-color: #3aa0ff;
      border: 1px solid #3aa0ff;
    }
    .crowd-content-statistics {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 28px 0;
      background-color: #fbfbfb;
      margin-top: 20px;
      border-radius: 10px;
      .content-statistics-item {
        width: 205%;
        .bgColorBlue {
          background-color: #90ddf6;
        }
        .bgColorPurple {
          background-color: #90abf6;
        }
        .bgColorRed {
          background-color: #f69090;
        }
        .bgColorYellow {
          background-color: #f6b090;
        }
        .statistics-box {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          text-align: center;
          margin: 0 auto;
          color: #fff;
          position: relative;
          .statistics-number {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 22px;
            .statistics-title {
              margin-top: 10px;
              font-size: 18px;
            }
          }
        }
        .pop-item-last {
          margin: 0 auto;
          .lastImg {
            display: block;
            width: 63px;
            margin: 0 auto 20px;
          }
          .last-info {
            font-size: 32px;
            font-weight: 800;
            color: #fb0b01;
            text-align: center;
          }
        }
      }
    }
    .statistics-content-box {
      display: flex;
      justify-content: space-between;
    }
    .statistics-content {
      width: 50%;
      height: 700px;
      margin-top: 20px;
      .echarts,
      .map {
        width: 100%;
        height: 100%;
      }
    }
  }
  .crowd-box:last-child {
    margin-bottom: 0;
  }
}
</style>
