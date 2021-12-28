<template>
  <!-- <div>
    <el-button-group>
      <el-button @click="goTo('/recommend_report')">推荐指数报告</el-button>
      <el-button @click="goTo('/point_report')">评估报告</el-button>
    </el-button-group>
  </div> -->
  <div class="main">
    <div class="title-box">
      <div class="title">
        <img src="@assets/img/wenben.png" class="title-img" />
        <span>任务列表</span>
      </div>
      <div class="search">
        <div class="search-box">
          <el-input
            v-model="searchData"
            placeholder="请输入任务名称"
          ></el-input>
          <el-button type="primary" class="search-but">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="content-box">
      <!-- v-loading="LoadingStatus" -->
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
        <el-table-column label="序号" type="index" align="center" width="100" />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="name"
          label="任务名称"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="type"
          label="任务类型"
        />

        <el-table-column align="center" prop="statsu" label="任务状态">
          <template slot-scope="scope">
            <span>
              {{ scope.row.statsu | taskStatus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="time"
          label="任务创建时间"
        />
        <el-table-column show-overflow-tooltip align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog(scope)"
              >任务详情</el-button
            >
            <el-button @click="checkTask(scope)" type="text"
              >查看报告</el-button
            >
            <!-- <el-button  type="text">中止</el-button> -->
            <!-- <el-button  type="text">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--任务详情 -->
    <PointDetails
      v-if="pointDialogVisible"
      :visible="pointDialogVisible"
      :onCancel="() => (pointDialogVisible = false)"
    ></PointDetails>
    <AddressDetalis
      v-if="addressDialogVisible"
      :visible="addressDialogVisible"
      :onCancel="() => (addressDialogVisible = false)"
    ></AddressDetalis>
    <!-- 报告详情 -->
    <el-dialog
      title="报告详情"
      :visible.sync="taskVisibleMode"
      @close="changeVisible"
      center
    >
      <div class="cont-box">
        <div class="area-cont-box">
          <template v-for="(item, index) in mapArea">
            <div
              class="area-item"
              :class="active == index + 1 ? 'active' : ''"
              :key="index"
              @click="selectArea(index)"
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
                  <div class="area-detali" @click="goTo">详情></div>
                </div>
                <div class="area-item-info">{{ item.info }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible"> 取消 </el-button>
      </div>
    </el-dialog>

    <!-- <el-button @click="aaa('/recommend_report11')"> 推荐指数报告 </el-button> -->
    <!-- <el-button @click="aaa('/point_report11')"> 评估报告 </el-button> -->
  </div>
</template>

<script>
import AddressDetalis from "./common/addressDetalis/index.vue";
import PointDetails from "./common/pointDetails/index.vue";

export default {
  components: { AddressDetalis, PointDetails },

  data() {
    return {
      searchData: "", //搜索框内容
      tableData: [
        {
          name: "室内滑雪新店点位评估",
          type: "点位评估",
          statsu: "dwon",
          time: "2021-10-01 14:30",
        },
        {
          name: "一公里社区店选址预选",
          type: "选址推荐",
          statsu: "loading",
          time: "2021-10-01 14:30",
        },
      ],
      pointDialogVisible: false,
      addressDialogVisible: false,
      taskVisibleMode: false,
      visibleType: "",

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
      active: "",
    };
  },
  created() {},
  methods: {
    // 点击查看报告
    checkTask(scope) {
      // this.taskVisibleMode = true;
      // this.visibleType = scope.row.type;
      if (scope.row.type == "选址推荐") {
        // this.$router.push("/recommend_report");
        this.taskVisibleMode = true;
        this.visibleType = scope.row.type;
      } else {
        this.$router.push("/point_report");
        this.taskVisibleMode = true;
        this.visibleType = scope.row.type;
      }
    },
    // 点击跳转页面
    goTo() {
      if (this.visibleType == "选址推荐") {
        this.$router.push("/recommend_report");
      } else {
        this.$router.push("/point_report");
      }
    },
    // 打开详情弹窗
    openDialog(scope) {
      if (scope.row.type == "选址推荐") {
        this.addressDialogVisible = true;
      } else {
        this.pointDialogVisible = true;
      }
    },
    // 关闭弹窗
    changeVisible() {
      this.taskVisibleMode = false;
      this.visibleType = "";
    },
    // 选择区域
    selectArea(index) {
      this.active = index + 1;
    },
    aaa(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 6px 10px;
}
.title-box {
  display: flex;
  // background-color: #f2f2f2;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
  .title {
    width: 50%;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    font-size: 18px;
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
  .search {
    width: 50%;
    position: relative;
  }
  .search-box {
    width: 350px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    .search-but {
      margin-left: 10px;
    }
  }
}
.content-box {
  border: 1px solid #e5e5e5;
  padding-bottom: 300px;
}
.cont-box {
  height: 300px;
  overflow: auto;
}
.area-cont-box {
  padding-bottom: 30px;
  .area-item:hover {
    background-color: #d0e6ff;
  }
  .active {
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
</style>
