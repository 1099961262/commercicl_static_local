<template>
  <div class="main">
    <div class="mapBox" ref="Map" id="container"></div>
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

    <el-button
      icon="el-icon-circle-plus-outline "
      class="drawerOpen"
      @click="drawer = true"
      >创建任务</el-button
    >
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :modal="false"
      :with-header="false"
      class="drawerBox"
      :size="500"
    >
      <div class="drawer-content">
        <div class="title">
          <i class="el-icon-s-order title-img"></i>
          <span class="title-info">基本信息</span>
        </div>
        <div class="steps-box">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="选择点位"></el-step>
            <el-step title="人群配置"></el-step>
            <el-step title="提交任务"></el-step>
          </el-steps>
        </div>
        <!-- 第一步 -->
        <el-form
          ref="formOne"
          :model="formOne"
          :rules="rulesOne"
          label-width="80px"
          v-if="active == 0"
        >
          <el-form-item prop="name" label="任务名称">
            <el-input v-model="formOne.name"></el-input>
          </el-form-item>
          <el-form-item prop="region" label="选择区域">
            <el-select
              v-model="formOne.region"
              placeholder="请选择"
              class="width100"
            >
              <el-option label="北京" value="tianj"></el-option>
              <el-option label="天津" value="beijing"></el-option>
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="重庆" value="chongq"></el-option>
              <el-option label="四川" value="shic"></el-option>
              <el-option label="贵州" value="guiz"></el-option>
              <el-option label="云南" value="uynnan"></el-option>
              <el-option label="河南" value="henan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="radius" label="辐射半径">
            <el-select
              v-model="formOne.radius"
              placeholder="请选择"
              class="width100"
            >
              <el-option label="500米" value="shanghai"></el-option>
              <el-option label="1000米" value="beijing"></el-option>
              <el-option label="1500米" value="aa"></el-option>
            </el-select>
          </el-form-item>
          <div class="area-select-box">
            <div class="area-select-item">
              <div class="area-select-item-cont">
                <div
                  class="item-cont-img"
                  :class="[
                    selectAreaType == 'circle' ? 'circleActive' : 'circle',
                  ]"
                  @click="selectMapType('circle')"
                ></div>
                <div class="item-cont-title">画圈</div>
              </div>
            </div>
            <div class="area-select-item">
              <div class="area-select-item-cont">
                <div
                  class="item-cont-img-two"
                  :class="[
                    selectAreaType == 'polygon' ? 'polygonActive' : 'polygon',
                  ]"
                  @click="selectMapType('polygon')"
                ></div>
                <div class="item-cont-title">画多边形</div>
              </div>
            </div>
            <div class="area-select-item">
              <div class="area-select-item-cont">
                <div
                  class="item-cont-img-three"
                  :class="[
                    selectAreaType == 'moveMap' ? 'moveMapActive' : 'moveMap',
                  ]"
                  @click="selectMapType('moveMap')"
                ></div>
                <div class="item-cont-title">移动地图</div>
              </div>
            </div>
          </div>
          <div class="area-select-all">
            <div class="area-select-all-top">
              <img
                src="@assets/img/posation.png"
                alt=""
                class="select-all-top-img"
              />
              <div class="select-all-top-name">已选区域</div>
              <img
                src="@assets/img/qingchu.png"
                alt=""
                class="select-all-top-clear"
                @click="clearArea"
              />
            </div>
            <div class="selected-area-box">
              <div class="selected-area-cont">
                <div class="selected-area" v-for="item in areaArr" :key="item">
                  <span>自定义区域{{ item }}</span>
                  <img
                    src="@assets/img/qingchu-2.png"
                    alt=""
                    class="selected-area-clear"
                    @click="() => loseArea(item)"
                  />
                </div>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmitOne">下一步</el-button>
            <el-button @click="resetOne('formOne')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 第二步 -->
        <el-form
          ref="formTwo"
          :model="formTwo"
          label-width="80px"
          :rules="rulesTwo"
          v-if="active == 1"
        >
          <el-form-item prop="date" label="选择数据">
            <el-date-picker
              v-model="formTwo.date"
              :type="dateType == 'day' ? 'date' : 'month'"
              placeholder="请选择"
              class="dateInput"
            >
            </el-date-picker>
            <el-button
              type="primary"
              class="dateTypebut"
              @click="changeDatetype"
              >{{ dateType == "day" ? "按月" : "按日" }}</el-button
            >
          </el-form-item>
          <el-form-item prop="pop" label="选择人群">
            <el-select
              v-model="formTwo.pop"
              placeholder="请选择"
              class="width100"
            >
              <el-option label="全部用户" value="all"></el-option>
              <el-option label="按工作地" value="shanghai"></el-option>
              <el-option label="按居住地" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <div class="tag-select-box">
            <div class="tag-title-box">
              <div class="tag-title">选择关注的人群标签：</div>
              <div class="tag-info">(已选标签的标签项优先显示)</div>
            </div>
            <div>
              <el-button type="info" plain @click="selectTag"
                >添加标签</el-button
              >
            </div>
          </div>
          <div class="area-select-all">
            <div class="area-select-all-top">
              <img
                src="@assets/img/24gf-tags3.png"
                alt=""
                class="select-all-top-img-two"
              />
              <div class="select-all-top-name">已选标签</div>
              <img
                src="@assets/img/qingchu.png"
                alt=""
                class="select-all-top-clear"
              />
            </div>
            <div class="selected-area-box">
              <div class="selected-area-cont">
                <div class="selected-area">
                  <span>用户手机上网流量：0-50MB</span>
                  <img
                    src="@assets/img/qingchu-2.png"
                    alt=""
                    class="selected-area-clear"
                  />
                </div>
                <div class="selected-area">
                  <span>用户手机上网流量：50-100MB</span>
                  <img
                    src="@assets/img/qingchu-2.png"
                    alt=""
                    class="selected-area-clear"
                  />
                </div>
                <div class="selected-area">
                  <span>用户手机上网流量：100-200MB</span>
                  <img
                    src="@assets/img/qingchu-2.png"
                    alt=""
                    class="selected-area-clear"
                  />
                </div>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmitTwo">提交</el-button>
            <el-button @click="backStep">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 结果弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="tipsDialogVisible"
      width="500"
      center
      :before-close="tipsHandleClose"
    >
      <div class="result-box">
        <img src="@assets/img/chenggonganli.png" alt="" class="result-img" />
        <div class="result-title">任务创建成功！</div>
        <div class="result-info">
          您可以到“我的任务”页管理该任务和查看评估报告
        </div>
        <el-button type="primary" class="result-button" @click="tipsHandleClose"
          >我知道了({{ closeTime }}秒)</el-button
        >
      </div>
    </el-dialog>
    <RagDialog
      v-if="tagDialogVisible"
      :visible="tagDialogVisible"
      :onCancel="() => (tagDialogVisible = false)"
    ></RagDialog>
  </div>
</template>

<script>
import RagDialog from "./RagDialog.vue";

let map; //地图实例
let mouseTool; //鼠标工具
let listener; //事件监听器

export default {
  data() {
    return {
      searchInput: "", //搜索框数据
      drawer: false, //抽屉显示控制
      active: 0, //步骤条控制
      formOne: {}, //第一步表单数据
      //第一步表单验证规则
      rulesOne: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      formTwo: {}, //第二步表单数据
      //第二步表单验证规则
      rulesTwo: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      dateType: "month", //日期类型-按日，按月
      selectAreaType: "moveMap",
      tipsDialogVisible: false, //结果弹窗
      tagDialogVisible: false, //选择标签弹窗

      areaArr: [1, 2, 3, 4, 5],
      closeTime: 3,
    };
  },
  components: { RagDialog },
  created() {},
  mounted() {
    // 初始化
    setTimeout(() => {
      // 初始化地图
      map = new AMap.Map("container", {
        zoom: 9,
        mapStyle: "amap://styles/light",
      });
      //使用鼠标工具
      map.plugin(["AMap.MouseTool"], function () {
        mouseTool = new AMap.MouseTool(map);
      });
    }, 1000);
  },
  methods: {
    // 第一步点击确定
    onSubmitOne() {
      this.active = 1;
      // this.$refs.formOne.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 重置表单
    resetOne(formName) {
      this.$refs[formName].resetFields();
    },
    // 地图操作方式
    selectMapType(type) {
      if (this.selectAreaType != type) {
        this.selectAreaType = type;
        if (type === "circle") {
          //绘制圆形
          map.clearMap();
          //用鼠标工具画多边形
          mouseTool.circle();
          //添加事件
          // getLat(mode);
        } else if (type === "polygon") {
          //绘制多边形
          map.clearMap();
          // //用鼠标工具画多边形
          mouseTool.polygon();
          //添加事件
          // getLat(mode);
        }
      }
    },
    // 改变年日期输入格式
    changeDatetype() {
      if (this.dateType == "day") {
        this.dateType = "month";
      } else {
        this.dateType = "day";
      }
    },
    // 第二步点击提交
    onSubmitTwo() {
      this.active = 2;
      this.tipsDialogVisible = true;
      this.active = 0;
      this.drawer = false;

      let close = setInterval(() => {
        if (!this.closeTime) {
          clearInterval(close);
          this.tipsHandleClose();
          return;
        }
        this.closeTime = this.closeTime - 1;
      }, 1000);
    },
    // 第二步点击上一步
    backStep() {
      this.active = 0;
    },
    // 关闭结果提示弹窗
    tipsHandleClose() {
      this.tipsDialogVisible = false;
    },
    // 点击打开添加标签弹窗
    selectTag() {
      this.tagDialogVisible = true;
    },
    // shanc
    loseArea(index) {
      this.areaArr.splice(index - 1, 1);
    },
    clearArea() {
      this.areaArr = [];
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .mapBox {
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
  .drawerOpen {
    width: 137px;
    height: 56px;
    background-color: #28afff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    position: absolute;
    top: 23px;
    right: 0;
    color: #fff;
  }
  .drawerBox {
    position: absolute !important;
  }
  .drawer-content {
    padding: 0 20px;

    .title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 30px;
      font-size: 18px;
      color: rgb(39, 117, 216);
      position: relative;
      margin-bottom: 10px;
      .title-img {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .title-info {
        color: #3a3a3a;
        font-size: 18px;
        text-align: left;
        font-weight: bold;
      }
    }
    .steps-box {
      padding: 20px 0 0 0;
      margin-bottom: 30px;
    }
    .dateInput {
      width: calc(~"100% - 80px");
    }
    .dateTypebut {
      width: 70px;
      margin-left: 10px;
    }
    .area-select-box {
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .area-select-item {
        width: 33%;
        .area-select-item-cont {
          width: 70px;
          margin: 0 auto;
          .item-cont-img {
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .item-cont-img-two {
            width: 44px;
            height: 40px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .item-cont-img-three {
            width: 33px;
            height: 41px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .circle {
            background: url("~@assets/img/quanxuan.png") 100% 100% no-repeat;
          }
          .polygon {
            background: url("~@assets/img/duobianxingxuanze.png") 100% 100%
              no-repeat;
          }
          .moveMap {
            background: url("~@assets/img/shoudong.png") 100% 100% no-repeat;
          }
          .circleActive {
            background: url("~@assets/img/quanxuan-active.png") 100% 100%
              no-repeat;
          }
          .polygonActive {
            background: url("~@assets/img/duobianxingxuanze-active.png") 100%
              100% no-repeat;
          }
          .moveMapActive {
            background: url("~@assets/img/shoudong-active.png") 100% 100%
              no-repeat;
          }
          .item-cont-title {
            text-align: center;
            font-size: 16px;
            line-height: 50px;
            color: #363636;
          }
        }
      }
    }
    .area-select-all {
      width: 100%;
      height: 302px;
      background: #f8f8f8;
      border-radius: 6px;
      margin-bottom: 20px;
      overflow: hidden;
      .area-select-all-top {
        width: 100%;
        position: relative;
        padding-left: 60px;
        padding-right: 20px;
        background: #cde4ff;
        .select-all-top-img {
          width: 20px;
          height: 26px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .select-all-top-img-two {
          width: 22px;
          height: 22px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .select-all-top-name {
          width: 64px;
          line-height: 52px;
          height: 52px;
          font-size: 16px;
          color: #363636;
        }
        .select-all-top-clear {
          width: 24px;
          height: 23px;
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      .selected-area-box {
        width: 100%;
        height: 250px;
        padding: 20px 14px;
        overflow-y: auto;
        .selected-area-cont {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .selected-area {
            background: #ffe3e3;
            border-radius: 13px;
            border: 1px solid #ff7979;
            font-size: 14px;
            color: #e35454;
            padding: 3px 30px 3px 10px;
            position: relative;
            margin-bottom: 10px;
            margin-right: 10px;
            .selected-area-clear {
              width: 12px;
              height: 12px;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
          .selected-area:nth-child(3n) {
            margin-right: none;
          }
        }
      }
    }
    .tag-select-box {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .tag-title-box {
        .tag-title {
          font-size: 16px;
          color: #363636;
          line-height: 30px;
        }
        .tag-info {
          font-size: 12px;
          color: #ff621c;
        }
      }
    }
  }
  .result-box {
    .result-img {
      display: block;
      width: 89px;
      height: 94px;
      margin: 89px auto 0;
    }
    .result-title {
      font-size: 18px;
      font-weight: bold;
      color: #414141;
      margin-top: 20px;
      text-align: center;
    }
    .result-info {
      font-size: 16px;
      color: #888888;
      margin-top: 10px;
      text-align: center;
    }
    .result-button {
      display: block;
      margin: 68px auto 0;
    }
  }

  .width100 {
    width: 100%;
  }
}
</style>
