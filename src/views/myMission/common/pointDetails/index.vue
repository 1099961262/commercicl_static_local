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
      <!-- 已选标签 -->
      <div class="task-info">
        <div class="title">
          <img src="@assets/img/biaoqian-2.png" class="title-img" />
          <span>已选标签</span>
        </div>
        <div>
          <el-collapse value="1" accordion>
            <el-collapse-item name="1">
              <div slot="title" class="collapse-item-title">基础属性</div>
              <!-- <div class="tree-box">
                <el-tree
                  :data="fractionData"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div v-if="node.data.children">{{ node.label }}</div>
                    <el-checkbox
                      v-if="!node.data.children"
                      disabled
                      :checked="node.data.checked"
                      >{{ node.label }}</el-checkbox
                    >
                  </div>
                </el-tree>
              </div> -->
              <div class="tree-box-from">
                <el-descriptions>
                  <el-descriptions-item label="手机上网流量"
                    >500M-1G</el-descriptions-item
                  >
                  <el-descriptions-item label="人群籍贯"
                    >北京</el-descriptions-item
                  >
                  <el-descriptions-item label="性别">男</el-descriptions-item>
                  <el-descriptions-item label="年龄分段"
                    >21-30</el-descriptions-item
                  >
                  <el-descriptions-item label="话费消费力"
                    >51-100</el-descriptions-item
                  >
                  <el-descriptions-item label="用户在网时长"
                    >3-4年</el-descriptions-item
                  >
                </el-descriptions>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <div slot="title" class="collapse-item-title">APP使用偏好</div>
              <!-- <div class="tree-box">
                <el-tree
                  :data="fractionData"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div v-if="node.data.children">{{ node.label }}</div>
                    <el-checkbox
                      v-if="!node.data.children"
                      disabled
                      :checked="node.data.checked"
                      >{{ node.label }}</el-checkbox
                    >
                  </div>
                </el-tree>
              </div> -->
              <div class="tree-box-from">
                <el-descriptions>
                  <el-descriptions-item label="总上网时长"
                    >5-8小时</el-descriptions-item
                  >
                  <el-descriptions-item label="游戏类"
                    >0-4小时</el-descriptions-item
                  >
                  <el-descriptions-item label="购物类"
                    >0-4小时</el-descriptions-item
                  >
                  <el-descriptions-item label="投资理财类"
                    >0-4小时</el-descriptions-item
                  >
                  <el-descriptions-item label="社交类"
                    >0-4小时</el-descriptions-item
                  >
                  <el-descriptions-item label="运动类"
                    >0-4小时</el-descriptions-item
                  >
                </el-descriptions>
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
          <!-- <div class="area-box">
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
                    <div class="area-detali">详情></div>
                  </div>
                  <div class="area-item-info">{{ item.info }}</div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
let map;

export default {
  name: "PointDetails",
  props: ["visible", "onCancel"],
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
      tableData: [
        {
          time: "2021-12-30 12:00:00",
          jindu: "100%",
          filesName: ["一公里社区店选址预选-海淀区山水园.pdf"],
        },
      ],
      // 分数设置树状数据
      fractionData: [
        {
          id: 1,
          label: "话费消费档次",
          children: [
            {
              id: 2,
              label: "高级",
              checked: true,
            },
            {
              id: 3,
              label: "中级",
              checked: true,
            },
            {
              id: 4,
              label: "低级",
            },
          ],
        },
        {
          id: 7,
          label: "性别",
          value: "50",
          children: [
            {
              id: 5,
              label: "男",
              checked: true,
            },
            {
              id: 6,
              label: "女",
            },
          ],
        },
        {
          id: 8,
          label: "用户在网时长",
          children: [
            {
              id: 9,
              label: "小于1年",
            },
            {
              id: 10,
              label: "1-2年",
              checked: true,
            },
            {
              id: 11,
              label: "2-3年",
              checked: true,
            },
          ],
        },
      ],
      searchInput: "",
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // // 初始化地图
      map = new AMap.Map("container", {
        zoom: 9,
        mapStyle: "amap://styles/light",
      });
    }, 1000);
  },
  methods: {},
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
    .tree-box-from {
      padding: 20px 20px 0;
    }
    .tree-box {
      // width: 25%;
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
    }
  }
  .task-info:first-child {
    margin-top: 0;
  }
}
</style>
