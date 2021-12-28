<template>
  <!-- 添加标签 -->
  <el-dialog
    title="人群洞察"
    :visible.sync="visibleMode"
    width="90%"
    @close="onSave()"
  >
    <div class="tag-box">
      <div class="tag-cont">
        <el-form ref="formTag" :model="formTag" :rules="rulesTag" size="small">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item name="1">
              <div slot="title" class="collapse-item-title">基本属性</div>
              <el-form-item prop="region" label="手机上网流量">
                <el-select
                  v-model="formTag.region"
                  placeholder="请选择"
                  multiple
                  class="width100"
                >
                  <el-option label="0-50M" value="1"></el-option>
                  <el-option label="50-100M" value="2"></el-option>
                  <el-option label="100-500M" value="3"></el-option>
                  <el-option label="500M-1G" value="4"></el-option>
                  <el-option label="1-2G" value="5"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="jiguan" label="人群籍贯">
                <el-select
                  v-model="formTag.jiguan"
                  placeholder="请选择"
                  class="width100"
                  multiple
                >
                  <el-option label="四川" value="1"></el-option>
                  <el-option label="重庆" value="2"></el-option>
                  <el-option label="北京" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="xinbie" label="性别">
                <el-select
                  v-model="formTag.xinbie"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="nanling" label="年龄分段">
                <el-select
                  v-model="formTag.nanling"
                  placeholder="请选择"
                  class="width100"
                  multiple
                >
                  <el-option label="≤18岁" value="1"></el-option>
                  <el-option label="19-25" value="2"></el-option>
                  <el-option label="26-35" value="3"></el-option>
                  <el-option label="36-45" value="4"></el-option>
                  <el-option label="46-55" value="5"></el-option>
                  <el-option label="56-65" value="6"></el-option>
                  <el-option label="≥66" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="huafei" label="话费消费力">
                <el-select
                  v-model="formTag.huafei"
                  placeholder="请选择"
                  class="width100"
                  multiple
                >
                  <el-option label="0-50" value="1"></el-option>
                  <el-option label="51-100" value="2"></el-option>
                  <el-option label="101-200及以上" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="zaiwang" label="用户在网时长">
                <el-select
                  v-model="formTag.zaiwang"
                  placeholder="请选择"
                  class="width100"
                  multiple
                >
                  <el-option label="小于1年" value="1"></el-option>
                  <el-option label="1-2年" value="2"></el-option>
                  <el-option label="2-3年" value="3"></el-option>
                  <el-option label="3-4年" value="4"></el-option>
                  <el-option label="4-5年" value="5"></el-option>
                  <el-option label="5年及以上" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="2">
              <div slot="title" class="collapse-item-title">APP使用偏好</div>
              <el-form-item prop="sahngwang" label="总上网时长">
                <el-select
                  v-model="formTag.sahngwang"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-4小时" value="1"></el-option>
                  <el-option label="5-8小时" value="2"></el-option>
                  <el-option label="8-12小时" value="3"></el-option>
                  <el-option label="12小时以上" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="youxi" label="游戏类">
                <el-select
                  v-model="formTag.youxi"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-4小时" value="11"></el-option>
                  <el-option label="4小时" value="1"></el-option>
                  <el-option label="6小时" value="2"></el-option>
                  <el-option label="8小时以上" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="gouwu" label="购物类">
                <el-select
                  v-model="formTag.gouwu"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-4小时" value="11"></el-option>
                  <el-option label="4小时" value="1"></el-option>
                  <el-option label="6小时" value="2"></el-option>
                  <el-option label="8小时以上" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="licai" label="投资理财类">
                <el-select
                  v-model="formTag.licai"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-4小时" value="11"></el-option>
                  <el-option label="4小时" value="1"></el-option>
                  <el-option label="6小时" value="2"></el-option>
                  <el-option label="8小时以上" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="shejiao" label="社交类">
                <el-select
                  v-model="formTag.shejiao"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-4小时" value="11"></el-option>
                  <el-option label="4小时" value="1"></el-option>
                  <el-option label="6小时" value="2"></el-option>
                  <el-option label="8小时以上" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="yundong" label="运动类">
                <el-select
                  v-model="formTag.yundong"
                  placeholder="请选择"
                  class="width100"
                >
                  <el-option label="0-1小时" value="1"></el-option>
                  <el-option label="1-2小时" value="2"></el-option>
                  <el-option label="2-3小时" value="3"></el-option>
                  <el-option label="4小时及以上" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <div class="tag-but-box">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button @click="resetOne('formTag')">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="echart-cont">
        <div class="echart-cont-title">
          说明：1、基于当前区域内所有人员进行分析。2、勾选标签，优先展示标签内容。以下为选中某个标签的示意。
        </div>
        <!-- 用户手机上网流量 -->
        <div class="big-box">
          <div class="echarts" ref="internetTraffic"></div>
        </div>
        <div class="bottom-box">
          <div class="sex-box">
            <div class="echarts" ref="sex"></div>
            =
          </div>
          <div class="sex-box">
            <div class="echarts" ref="pets"></div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import * as echarts from "echarts";

export default {
  props: ["visible", "onCancel"],
  name: "RagDialog",
  data() {
    return {
      visibleMode: this.visible,
      formTag: {}, //第二步表单数据
      //第二步表单验证规则
      rulesTag: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },

      activeNames: "1", //添加标签弹窗默认展开项
      internetTrafficEchart: {},
      sexEchart: {},
      petsEchart: {},
    };
  },
  mounted() {
    // 初始化echarts
    setTimeout(() => {
      this.internetTrafficEchart = echarts.init(this.$refs.internetTraffic);
      this.sexEchart = echarts.init(this.$refs.sex);
      this.petsEchart = echarts.init(this.$refs.pets);
      // 显示
      this.setInternetTrafficEchart();
      this.setSexEchart();
      this.setPetsEchart();
    }, 1000);
  },
  methods: {
    //  添加标签点击保存
    onSave() {
      // this.$refs.formTag.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     return false;
      //   }
      // });
      this.onCancel();
    },
    // echarts
    setInternetTrafficEchart() {
      let option = {
        title: { text: "用户手机上网流量" },
        color: ["#4985F1"],
        tooltip: {
          trigger: "item",
        },
        dataZoom: {
          type: "slider",
        },
        xAxis: {
          type: "category",
          data: [
            "0-50MB",
            "50MB-1G",
            "1G-5GB",
            "5G-10GB",
            "10GB-15GB",
            "15GB-20GB",
            "20GB-30GB",
            "30GB-40G",
            "30GB-50GB",
            ">50GB",
          ],
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
            data: [
              {
                value: "120",
                itemStyle: {
                  color: "#4BBFF1",
                },
              },
              {
                value: "200",
                itemStyle: {
                  color: "#4BBFF1",
                },
              },
              {
                value: "150",
                itemStyle: {
                  color: "#4BBFF1",
                },
              },
              80,
              70,
              120,
              200,
              150,
              80,
              70,
            ],
            type: "bar",
            barMaxWidth: "26px",
            showBackground: true,
            backgroundStyle: {
              color: "#D8F3FF",
            },
          },
        ],
      };
      this.internetTrafficEchart.setOption(option);
    },
    setSexEchart() {
      // let backgroundColor = "rgba(0,0,0,1)";
      let chartdata = [
        [240, 250],
        ["女", "男"],
      ];

      var getmydmc = chartdata[1]; //名称
      var getmyd = chartdata[0]; //数值
      var getmydzd = []; //最大值-用于背景条

      getmydzd = [getmyd[0] + getmyd[1], getmyd[0] + getmyd[1]];
      // 数据进度条，值和颜色
      let data = [
        {
          value: getmyd[0],
          itemStyle: {
            color: "#EF7878",
            emphasis: {
              color: "#EF7878",
            },
          },
        },
        {
          value: getmyd[1],
          itemStyle: {
            color: "#789DEF",
            emphasis: {
              color: "#789DEF",
            },
          },
        },
      ];
      // 背景条颜色和值
      let backgroundData = [
        {
          value: getmyd[0] + getmyd[1],
          itemStyle: {
            color: "#FFE2E2",
            emphasis: {
              color: "#FFE2E2",
            },
          },
        },
        {
          value: getmyd[0] + getmyd[1],
          itemStyle: {
            color: "#D8E4FF",
            emphasis: {
              color: "#D8E4FF",
            },
          },
        },
      ];

      let option = {
        title: {
          text: "性别",
        },
        tooltip: {
          show: false,
        },
        xAxis: [
          {
            type: "value",
            show: false,
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
          {
            type: "value",
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            inside: true,
            nameTextStyle: {
              padding: [20, 20, 0, 0], // 四个数字分别为上右下左与原位置距离
            },
            inverse: true,
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: getmydmc,
          },
        ],

        series: [
          {
            // 分隔线
            type: "pictorialBar",
            itemStyle: {
              normal: {
                color: "#fbfbfb",
              },
            },
            legendHoverLink: false,
            symbolRepeat: "fixed",
            symbolMargin: 4,
            symbol: "rect",
            symbolClip: true,
            symbolSize: [4, 15],
            symbolPosition: "start",
            symbolOffset: [8, 0],
            data: getmydzd,
            z: 66,
            animationEasing: "elasticOut",
          },
          {
            name: "值",
            type: "bar",
            xAxisIndex: 0,
            barWidth: 14,
            data: data,
            z: 1,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: [0, -20], //在上方显示
                  formatter: "{b}",
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
          },
          {
            // 背景
            type: "pictorialBar",
            legendHoverLink: false,
            symbolRepeat: false,
            symbol: "rect",
            symbolClip: true,
            symbolSize: ["100%", 15],
            symbolPosition: "start",
            symbolOffset: [0, 0],
            data: backgroundData,
            z: 0,
            animationEasing: "elasticOut",
          },
        ],
      };
      this.sexEchart.setOption(option);
    },
    setPetsEchart() {
      let option = {
        title: {
          text: "宠物",
        },
        backgroundColor: "#fbfbfb",
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "middle",
        },
        series: [
          {
            name: "宠物",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "小佩宠物" },
              { value: 735, name: "波奇宠物" },
              { value: 580, name: "E宠" },
              { value: 484, name: "小狗在家" },
            ],
            itemStyle: {
              borderWidth: 2, //设置border的宽度有多大
              borderColor: "#fbfbfb",
            },
            label: {
              show: false,
            },
          },
        ],
      };

      this.petsEchart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.tag-box {
  width: 100%;
  display: flex;
  .tag-cont {
    width: 30%;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
    border-radius: 1px;
    border: 1px solid #f3f3f3;
    padding: 0 20px;
    .tag-but-box {
      display: flex;
      justify-content: space-around;
      padding: 20px;
    }
  }
  .collapse-item-title {
    font-size: 16px;
    font-weight: bold;
  }
  .echart-cont {
    width: 70%;
    padding: 0 20px 20px;
    .echart-cont-title {
      font-size: 14px;
      font-weight: 500;
      color: #eb7f7f;
      margin-bottom: 20px;
    }
    .big-box {
      width: 100%;
      height: 344px;
      padding-top: 10px;
      background-color: #fbfbfb;
      margin-bottom: 20px;
      .echarts {
        width: 100%;
        height: 100%;
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
      .sex-box {
        width: 49%;
        height: 344px;
        padding-top: 10px;
        background-color: #fbfbfb;
        .echarts {
          width: 100%;
          height: 100%;
        }
        .sex-title {
          font-size: 18px;
          font-weight: bold;
        }
        .sex-legend {
          display: flex;
          justify-content: flex-end;
          .nan-color {
            width: ;
          }
        }
      }
    }
  }
}

.width100 {
  width: 100%;
}
</style>
