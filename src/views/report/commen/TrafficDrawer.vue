<template>
  <el-drawer
    :visible="visible"
    :modal="false"
    :with-header="false"
    class="drawerBox"
    :size="500"
    @close="onCancel"
  >
    <div class="drawer-content">
      <div class="traffic-box">
        <div class="patching-zanshi">
          <div class="patching-zanshi-item">
            <div class="zanshi-item-cont">
              <img
                src="@/assets/img/tielu.png"
                alt=""
                class="zanshi-item-img"
              />
              <div class="zanshi-item-tips">
                <div class="zanshi-item-number">3个</div>
                <div class="zanshi-item-title">地铁站</div>
              </div>
            </div>
          </div>
          <div class="patching-zanshi-item">
            <div class="zanshi-item-cont">
              <img
                src="@/assets/img/gongjiao.png"
                alt=""
                class="zanshi-item-img img-two"
              />
              <div class="zanshi-item-tips">
                <div class="zanshi-item-number">2个</div>
                <div class="zanshi-item-title">公交站</div>
              </div>
            </div>
          </div>
          <div class="patching-zanshi-item">
            <div class="zanshi-item-cont">
              <img
                src="@/assets/img/tingchechang-2.png"
                alt=""
                class="zanshi-item-img img-three"
              />
              <div class="zanshi-item-tips">
                <div class="zanshi-item-number">10个</div>
                <div class="zanshi-item-title">停车场</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="date-box">
            <el-select value="1" placeholder="请选择">
              <el-option label="地铁站" value="1"></el-option>
              <el-option label="公交站" value="2"></el-option>
              <el-option label="停车场" value="3"></el-option>
            </el-select>
          </div>
          <el-table
            ref="multipleTable"
            stripe
            :data="trafficDrawerData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{
              background: '#E3F7FF',
              color: '#777777',
              fontWeight: '500',
            }"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="100"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="name"
              label="名称"
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
  name: "TrafficDrawer",
  props: ["visible", "onCancel"],
  data() {
    return {
      trafficDrawerData: [
        {
          name: "西二旗",
          juli: "12",
        },
        {
          name: "上地",
          juli: "500",
        },
      ],
    };
  },
  methods: {
    aaa() {
      this.onCancel();
    },
  },
};
</script>
<style lang="less" scope>
.drawerBox {
  position: absolute !important;
  z-index: 2 !important;
}
.drawer-content {
  padding-top: 59px;
}
.traffic-box {
  padding: 20px;
  .patching-zanshi {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 35px 25px;
    border-bottom: 1px solid #dedede;
    .patching-zanshi-item {
      width: 48%;
      box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.04);
      border-radius: 2px;
      padding: 30px 0;
      margin-bottom: 10px;
      .zanshi-item-cont {
        display: flex;
        justify-content: center;
        .zanshi-item-img {
          width: 42px;
          height: 50px;
        }
        .img-two {
          width: 38px;
          height: 47px;
        }
        .img-three {
          width: 52px;
          height: 51px;
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
  .date-box {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
  }
}
</style>
