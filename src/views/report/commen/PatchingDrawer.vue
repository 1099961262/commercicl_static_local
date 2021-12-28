<!-- 配套信息 -->

<template>
  <el-drawer
    :visible="visible"
    :modal="false"
    :with-header="false"
    class="drawerBox patchingDrawer"
    :size="500"
    @close="onCancel"
  >
    <div class="drawer-content">
      <div class="patching-box">
        <div class="patching-top">
          <div class="selected-box">
            <div class="selected-button">{{ selectedButton.label }}</div>
          </div>
          <el-popover
            class="patching-top-select"
            placement="bottom"
            width="480"
            trigger="click"
          >
            <div class="all-button">
              <div
                class="patching-button"
                v-for="item in buttonArr"
                :key="item.value"
                @click="changeButton(item.value)"
              >
                {{ item.label }}
              </div>
            </div>
            <div slot="reference">
              展开
              <div class="patching-top-select-img"></div>
            </div>
          </el-popover>
        </div>
        <div class="patching-zanshi">
          <div class="patching-zanshi-item">
            <div class="zanshi-item-cont">
              <img
                src="@/assets/img/shangchang.png"
                alt=""
                class="zanshi-item-img"
              />
              <div class="zanshi-item-tips">
                <div class="zanshi-item-number">123个</div>
                <div class="zanshi-item-title">大型商场</div>
              </div>
            </div>
          </div>
          <div class="patching-zanshi-item">
            <div class="zanshi-item-cont">
              <img
                src="@/assets/img/chaoshi.png"
                alt=""
                class="zanshi-item-img img-two"
              />
              <div class="zanshi-item-tips">
                <div class="zanshi-item-number">2个</div>
                <div class="zanshi-item-title">超市</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{
              background: '#E3F7FF',
              color: '#777777',
              fontWeight: '500',
            }"
          >
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="name"
              label="商场名称"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="type"
              label="商业类型"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="juli"
              label="距离(m)"
            />
          </el-table>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: "PatchingDrawer",
  props: ["visible", "onCancel"],
  data() {
    return {
      patchingDrawer: this.visible,
      tableData: [
        {
          name: "合生汇商场",
          type: "百货商场/购物中心",
          juli: "12",
        },
        {
          name: "便利蜂",
          type: "便利店",
          juli: "50",
        },
      ],
      selectedButton: {
        label: "购物",
        value: "gouwu",
      },
      buttonArr: [
        {
          label: "购物",
          value: "gouwu",
        },
        {
          label: "写字楼",
          value: "xiezhi",
        },
        {
          label: "教育",
          value: "jiaowu",
        },
        {
          label: "医疗",
          value: "yiliao",
        },
        {
          label: "休闲娱乐",
          value: "xiuxian",
        },
        {
          label: "公园景点",
          value: "gongyuan",
        },
        {
          label: "酒店住宿",
          value: "jiudian",
        },
        {
          label: "餐饮美食",
          value: "meis",
        },
        {
          label: "体育场所",
          value: "tiyu",
        },
      ],
    };
  },
  created() {},
  methods: {
    aaa() {
      this.onCancel();
    },
    // 配套信息-切换按钮
    changeButton(value) {
      this.buttonArr.map((item) => {
        if (item.value == value) {
          this.selectedButton = item;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.drawerBox {
  position: absolute !important;
  z-index: 2 !important;
}
.drawer-content {
  padding-top: 59px;
}
.patching-box {
  padding: 20px;
  .patching-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .selected-box {
      width: 50%;
      display: flex;
      .selected-button {
        padding: 5px 20px;
        border-radius: 3px;
        box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.04);
        font-size: 14px;
        font-weight: 500;
        color: #747474;
      }
    }
    .patching-top-select {
      line-height: 24px;
      padding-right: 40px;
      position: relative;
      font-weight: 500;
      font-size: 14px;
      color: #747474;
      cursor: pointer;
      .patching-top-select-img {
        width: 18px;
        height: 11px;
        background: url("~@assets/img/xiala-2.png") no-repeat;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .patching-zanshi {
    display: flex;
    justify-content: space-between;
    padding: 35px 25px;
    .patching-zanshi-item {
      width: 48%;
      box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.04);
      border-radius: 2px;
      padding: 30px 0;
      .zanshi-item-cont {
        display: flex;
        justify-content: center;
        .zanshi-item-img {
          width: 49px;
          height: 55px;
        }
        .img-two {
          width: 56px;
          height: 55px;
        }
        .zanshi-item-tips {
          margin-left: 10px;
          height: 55px;
          .zanshi-item-number {
            margin-top: 20px;
            font-size: 16px;
            line-height: 20px;
            font-weight: 500;
            color: #636363;
          }
          .zanshi-item-title {
            font-size: 14px;
            font-weight: 500;
            color: #636363;
          }
        }
      }
    }
  }
}
.all-button {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .patching-button {
    padding: 3px 20px;
    border-radius: 3px;
    box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.04);
    font-size: 14px;
    font-weight: 500;
    color: #747474;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .patching-button:hover {
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.04);
  }
}
</style>
