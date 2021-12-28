<template>
  <el-dialog
    title="任务详情"
    :visible.sync="visibleMode"
    width="90%"
    @close="onCancel()"
  >
    <div class="detalis-box">
      <!-- 任务信息 -->
      <div class="task-info borderBottom">
        <div class="title">
          <img src="@assets/img/jinrirenwu.png" class="title-img" />
          <span>任务信息</span>
        </div>
        <div class="task-cont">
          <el-form
            ref="formTag"
            :model="formTask"
            label-width="120px"
            size="mini"
          >
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="name" label="任务名称：">
                  <el-input
                    v-model="formTask.name"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="type" label="任务类型：">
                  <el-input
                    v-model="formTask.type"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="time" label="创建时间：">
                  <el-input
                    v-model="formTask.time"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="area" label="选择区域：">
                  <el-input
                    v-model="formTask.area"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="radius" label="辐射半径：">
                  <el-input
                    v-model="formTask.radius"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="date" label="选择数据：">
                  <el-input
                    v-model="formTask.date"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
                <el-form-item prop="pop" label="选择人群：">
                  <el-input
                    v-model="formTask.pop"
                    class="width100"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 报告进度 -->
      <div class="task-info borderBottom">
        <div class="title">
          <img src="@assets/img/baogao.png" class="title-img" />
          <span>报告进度</span>
        </div>
        <div class="report-progress">
          <el-table
            ref="multipleTable"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{
              background: '#f3f3f3',
              color: '#3a3a3a',
              fontWeight: 'bold',
            }"
          >
            <el-table-column
              label="生成时间"
              prop="time"
              show-overflow-tooltip
              align="center"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="jindu"
              label="进度"
            />

            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="filesName"
              label="文件名"
            >
              <template slot-scope="scope">
                <!-- <el-button type="text" @click="aa(scope)">aa</el-button> -->
                <template v-for="(item, index) in scope.row.filesName">
                  <el-button type="text" :key="index">{{ item }}</el-button>
                </template>
                <!-- <el-button type="text" :key="index">{{ item.name }}</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 标签评分 -->
      <div class="task-info">
        <div class="title">
          <img src="@assets/img/biaoqian-2.png" class="title-img" />
          <span>标签评分</span>
        </div>
        <div>
          <el-collapse value="1" accordion>
            <el-collapse-item name="1">
              <div slot="title" class="collapse-item-title">基础设置</div>
              <div class="tree-box">
                <el-tree
                  :data="fractionData"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div>{{ node.label }}</div>
                    <div>{{ node.data.value }}分</div>
                  </div>
                </el-tree>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <div slot="title" class="collapse-item-title">周边配套</div>
              <div class="tree-box">
                <el-tree
                  :data="twoFormData"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div>{{ node.label }}</div>
                    <div>{{ node.data.value }}分</div>
                  </div>
                </el-tree>
              </div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <div slot="title" class="collapse-item-title">APP使用偏好</div>
              <div class="tree-box">
                <el-tree
                  :data="threeFormData"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div>{{ node.label }}</div>
                    <div>{{ node.data.value }}分</div>
                  </div>
                </el-tree>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <!-- 选择区域 -->
      <div class="task-info">
        <div class="title">
          <img src="@assets/img/quyu.png" class="title-img" />
          <span>选择区域</span>
        </div>
        <div class="map-box">
          <div class="map" id="container"></div>
          <el-input
            placeholder="请输入选择区域"
            v-model="searchInput"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              class="searchBut"
            ></el-button>
          </el-input>
          <div class="area-box">
            <div class="area-box-title">推荐区域列表</div>
            <div class="area-cont-box">
              <div
                class="area-item"
                v-for="(item, index) in mapArea"
                :key="index"
              >
                <div class="area-item-cont">
                  <div class="area-top">
                    <div class="area-item-title">
                      <img
                        :src="require(`@assets/img/area-tips${index + 1}.png`)"
                        alt=""
                        class="area-tips-img"
                      />
                      <span class="area-number">{{ item.value || " " }}</span>
                      分
                    </div>
                    <div class="area-detali" @click="goToDetails">详情></div>
                  </div>
                  <div class="area-item-info">{{ item.info }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import maker_red from "@/assets/img/maker_red.png";
let map;

export default {
  props: ["visible", "onCancel"],
  name: "AddressDetalis",
  data() {
    return {
      visibleMode: this.visible,
      formTask: {
        name: "一公里社区报告选址预选",
        type: "选址推荐",
        time: "2021-12-30 12:00:00",
        area: "北京市",
        radius: "500m",
        date: "2021年9月",
        pop: "按工作地",
      },
      tableData: [],
      // tableData: [
      //   {
      //     time: "2021-12-30 12:00:00",
      //     jindu: "100%",
      //     filesName: ["一公里社区店选址预选-海淀区山水园.pdf"],
      //   },
      // ],
      // 分数设置树状数据
      fractionData: [
        {
          id: 1,
          label: "稳定/流动人口占比",
          value: "20",
          children: [
            {
              id: 2,
              label: "人员非常稳定",
              value: "4",
            },
            {
              id: 3,
              label: "人员较为稳定",
              value: "4",
            },
            {
              id: 4,
              label: "稳定性一般",
              value: "3",
            },
            {
              id: 5,
              label: "流动人口较多",
              value: "3",
            },
            {
              id: 6,
              label: "流动人口非常多",
              value: "3",
            },
            {
              id: 7,
              label: "流动人口为主",
              value: "3",
            },
          ],
        },
        {
          id: 8,
          label: "性别",
          value: "10",
          children: [
            {
              id: 9,
              label: "男",
              value: "10",
            },
            {
              id: 10,
              label: "女",
              value: "10",
            },
          ],
        },
        {
          id: 11,
          label: "年龄:",
          value: "20",
          children: [
            {
              id: 12,
              label: "18岁及以下",
              value: "20",
            },
            {
              id: 13,
              label: "19-35岁",
              value: "20",
            },
            {
              id: 14,
              label: "36-45岁",
              value: "20",
            },
            {
              id: 15,
              label: "46-55岁",
              value: "20",
            },
            {
              id: 16,
              label: "56-65岁",
              value: "20",
            },
            {
              id: 17,
              label: "66岁及以上",
              value: "20",
            },
          ],
        },
        {
          id: 18,
          label: "话费消费档次:",
          value: "20",
          children: [
            {
              id: 19,
              label: "低消费",
              value: "4",
            },
            {
              id: 20,
              label: "较低消费",
              value: "4",
            },
            {
              id: 21,
              label: "中等消费",
              value: "4",
            },
            {
              id: 22,
              label: "中高消费",
              value: "4",
            },
            {
              id: 23,
              label: "高消费",
              value: "4",
            },
          ],
        },
        {
          id: 24,
          label: "手机号码在网时长:",
          value: "10",
          children: [
            {
              id: 25,
              label: "一年以",
              value: "2",
            },
            {
              id: 26,
              label: "1-3年",
              value: "2",
            },
            {
              id: 27,
              label: "3-5年",
              value: "3",
            },
            {
              id: 28,
              label: "5年以上",
              value: "3",
            },
          ],
        },
        {
          id: 29,
          label: "月手机上网流量:",
          value: "10",
          children: [
            {
              id: 30,
              label: "100M以下",
              value: "10",
            },
            {
              id: 31,
              label: "101M-500M",
              value: "10",
            },
            {
              id: 32,
              label: "501M-1G年",
              value: "10",
            },
            {
              id: 33,
              label: "1-5G",
              value: "10",
            },
            {
              id: 34,
              label: "6-10G",
              value: "10",
            },
            {
              id: 35,
              label: "10G以上",
              value: "10",
            },
          ],
        },
        {
          id: 36,
          label: "终端类型:",
          value: "10",
          children: [
            {
              id: 37,
              label: "苹果",
              value: "2",
            },
            {
              id: 38,
              label: "华为",
              value: "2",
            },
            {
              id: 39,
              label: "OPPO",
              value: "1",
            },
            {
              id: 40,
              label: "vivo",
              value: "1",
            },
            {
              id: 41,
              label: "小米",
              value: "1",
            },
            {
              id: 42,
              label: "三星",
              value: "1",
            },
            {
              id: 43,
              label: "联想",
              value: "1",
            },
            {
              id: 44,
              label: "其他",
              value: "1",
            },
          ],
        },
      ],
      twoFormData: [
        {
          id: 1,
          label: "日均上网时长",
          value: "20",
          children: [
            {
              id: 2,
              label: "小于4小时",
              value: "10",
            },
            {
              id: 3,
              label: "4-8小时",
              value: "10",
            },
            {
              id: 4,
              label: "8小时以上",
              value: "10",
            },
          ],
        },
        {
          id: 7,
          label: "社交类偏好（日均）",
          value: "10",
          children: [
            {
              id: 5,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 6,
              label: "中度 1-3小时",
              value: "10",
            },
            {
              id: 8,
              label: "重度  4小时及以上",
              value: "10",
            },
          ],
        },
        {
          id: 11,
          label: "投资理财类偏好（日均）:",
          value: "10",
          children: [
            {
              id: 12,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 13,
              label: "中度 1-3小时",
              value: "10",
            },
            {
              id: 14,
              label: "重度  4小时及以上",
              value: "10",
            },
          ],
        },
        {
          id: 18,
          label: "宠物类使用偏好（日均）:",
          value: "20",
          children: [
            {
              id: 19,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 20,
              label: "中度 1-3小时",
              value: "5",
            },
            {
              id: 21,
              label: "重度  4小时及以上",
              value: "5",
            },
          ],
        },
        {
          id: 24,
          label: "运动类使用偏好（日均）:",
          value: "30",
          children: [
            {
              id: 25,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 26,
              label: "中度 1-3小时",
              value: "10",
            },
            {
              id: 27,
              label: "重度  4小时及以上",
              value: "10",
            },
          ],
        },
        {
          id: 29,
          label: "购物类使用偏好（日均）:",
          value: "10",
          children: [
            {
              id: 30,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 31,
              label: "中度 1-3小时",
              value: "10",
            },
            {
              id: 32,
              label: "重度  4小时及以上",
              value: "10",
            },
          ],
        },
        {
          id: 36,
          label: "短视频类使用偏好（日均）:",
          value: "10",
          children: [
            {
              id: 37,
              label: "轻度（不足1小时）",
              value: "10",
            },
            {
              id: 38,
              label: "中度 1-3小时",
              value: "10",
            },
            {
              id: 39,
              label: "重度  4小时及以上",
              value: "10",
            },
          ],
        },
      ],
      threeFormData: [
        {
          id: 1,
          label: "交通配套",
          value: "10",
          children: [
            {
              id: 2,
              label: "有公交站",
              value: "10",
            },
            {
              id: 3,
              label: "有地铁站",
              value: "10",
            },
            {
              id: 4,
              label: "有停车场",
              value: "10",
            },
          ],
        },
        {
          id: 5,
          label: "住宅和写字楼配套",
          value: "10",
          children: [
            {
              id: 6,
              label: "有住宅",
              value: "10",
            },
            {
              id: 7,
              label: "有写字楼",
              value: "10",
            },
          ],
        },
        {
          id: 8,
          label: "住宅价格（新房）",
          value: "10",
          children: [
            {
              id: 9,
              label: "大于区域平均",
              value: "10",
            },
            {
              id: 10,
              label: "小于区域平均",
              value: "10",
            },
          ],
        },
        {
          id: 11,
          label: "写字楼租金价格",
          value: "10",
          children: [
            {
              id: 12,
              label: "大于区域平均",
              value: "10",
            },
            {
              id: 13,
              label: "小于区域平均",
              value: "10",
            },
          ],
        },
        {
          id: 14,
          label: "学校",
          value: "10",
          children: [
            {
              id: 153,
              label: "有幼儿园",
              value: "10",
            },
            {
              id: 16,
              label: "有小学",
              value: "10",
            },
            {
              id: 17,
              label: "有中学",
              value: "10",
            },
            {
              id: 18,
              label: "有大学",
              value: "10",
            },
          ],
        },
        {
          id: 19,
          label: "餐饮酒店",
          value: "10",
          children: [
            {
              id: 20,
              label: "有中餐厅",
              value: "10",
            },
            {
              id: 21,
              label: "有西餐厅",
              value: "10",
            },
            {
              id: 22,
              label: "有火锅年",
              value: "10",
            },
            {
              id: 23,
              label: "有烧烤",
              value: "10",
            },
          ],
        },
        {
          id: 24,
          label: "商超",
          value: "10",
          children: [
            {
              id: 25,
              label: "大型超市",
              value: "10",
            },
            {
              id: 26,
              label: "便利店",
              value: "10",
            },
          ],
        },
        {
          id: 27,
          label: "休闲娱乐",
          value: "10",
          children: [
            {
              id: 28,
              label: "电影院",
              value: "10",
            },
            {
              id: 29,
              label: "剧院",
              value: "10",
            },
            {
              id: 30,
              label: "游乐场",
              value: "10",
            },
            {
              id: 31,
              label: "休闲广场",
              value: "10",
            },
            {
              id: 32,
              label: "咖啡馆",
              value: "10",
            },
            {
              id: 33,
              label: "酒吧",
              value: "10",
            },
          ],
        },
      ],
      searchInput: "",
      mapArea: [
        {
          value: "88.61",
          info: "西直门商圈北京枫蓝国际购物中心小区周边",
        },
        {
          value: "87.32",
          info: "北京贵宾楼饭店周边",
        },
        {
          value: "86.83",
          info: "北京南站周边",
        },
        {
          value: "85.96",
          info: "实诚天地教育综合大厦周边",
        },
        {
          value: "84.01",
          info: "航天中心医院周边",
        },
        {
          value: "82.12",
          info: "甘露园南里小区周边",
        },
        {
          value: "75.32",
          info: "叠泉乡村俱乐部周边",
        },
        {
          value: "72.58",
          info: "华北科技学院周边",
        },
      ],
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // // 初始化地图
      map = new AMap.Map("container", {
        zoom: 9,
        mapStyle: "amap://styles/light",
        center: [116.39, 39.9], //中心点坐标
      });

      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(116.356676, 39.95283),
        icon: maker_red,
      });
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(116.409264, 39.90815),
        icon: maker_red,
      });
      var marker3 = new AMap.Marker({
        position: new AMap.LngLat(116.378448, 39.865368),
        icon: maker_red,
      });
      var marker4 = new AMap.Marker({
        position: new AMap.LngLat(116.243557, 39.900379),
        icon: maker_red,
      });
      var marker5 = new AMap.Marker({
        position: new AMap.LngLat(116.252006, 39.916917),
        icon: maker_red,
      });
      var marker6 = new AMap.Marker({
        position: new AMap.LngLat(116.511716, 39.916766),
        icon: maker_red,
      });
      var marker7 = new AMap.Marker({
        position: new AMap.LngLat(116.602455, 39.935496),
        icon: maker_red,
      });
      var marker8 = new AMap.Marker({
        position: new AMap.LngLat(116.804328, 39.956733),
        icon: maker_red,
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add([
        marker1,
        marker2,
        marker3,
        marker4,
        marker5,
        marker6,
        marker7,
        marker8,
      ]);
    }, 1000);
  },
  methods: {
    goToDetails() {
      this.$router.push("/recommend_report");
    },
  },
};
</script>
<style lang="less" scoped>
.detalis-box {
  .title {
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 16px;
    font-weight: bold;
    color: #3a3a3a;
    text-align: left;
    position: relative;
    .title-img {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .width100 {
    width: 100%;
  }
  .borderBottom {
    border-bottom: 1px solid #e4e4e4;
  }
  .task-info {
    margin-top: 20px;
    .report-progress {
      padding-bottom: 40px;
    }
    .collapse-item-title {
      font-size: 16px;
      font-weight: bold;
    }
    /deep/.el-collapse-item__header {
      background-color: #eaf4ff;
      padding-left: 20px;
    }
    .tree-box {
      width: 25%;
      .custom-tree-node {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .fenshu {
          text-align: right;
        }
      }
    }
    .map-box {
      width: 100%;
      height: 953px;
      position: relative;
      .map {
        width: 100%;
        height: 100%;
      }
      .input-with-select {
        width: 440px;
        position: absolute;
        left: 42px;
        top: 43px;
      }
      .searchBut {
        color: #28afff;
        font-size: 20px;
      }
      .area-box {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #eaf4ff;
        width: 303px;
        .area-box-title {
          font-size: 16px;
          color: #363636;
          background-color: #c2d7ee;
          padding-left: 20px;
          height: 54px;
          line-height: 54px;
        }
        .area-cont-box {
          padding-bottom: 30px;
          .area-item:hover {
            background-color: #d0e6ff;
          }
          .area-item {
            padding: 0 10px;
            .area-item-cont {
              padding: 10px 0;
              border-bottom: 1px solid #dbdbdb;

              .area-top {
                display: flex;
                justify-content: space-between;
                .area-item-title {
                  position: relative;
                  padding-left: 20px;
                  font-size: 14px;
                  color: #363636;
                  .area-number {
                    font-size: 16px;
                    font-weight: 500;
                    color: #363636;
                  }
                  .area-tips-img {
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
                .area-detali {
                  cursor: pointer;
                }
              }
              .area-item-info {
                margin-top: 10px;
                padding-left: 20px;
                font-size: 12px;
                color: #363636;
              }
            }
          }
        }
      }
    }
  }
  .task-info:first-child {
    margin-top: 0;
  }
}
</style>
