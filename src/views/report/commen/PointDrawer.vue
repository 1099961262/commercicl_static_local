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
      <div class="point-box">
        <div class="point-title">
          <div class="point-title-tips"></div>
          <div class="point-title-info">该区域位于西单北大街附近</div>
        </div>
        <div class="point-tongji">
          <div class="point-tongji-item">
            <div class="point-tongji-item-number-box">89.77</div>
            <div class="point-tongji-item-info">基础设置分</div>
          </div>
          <div class="point-tongji-item">
            <div class="point-tongji-item-number-box">159</div>
            <div class="point-tongji-item-info">附加分：APP使用偏好</div>
          </div>
          <div class="point-tongji-item">
            <div class="point-tongji-item-number-box">5463</div>
            <div class="point-tongji-item-info">附加分：周边配套</div>
          </div>
        </div>
        <div class="point-cont">
          <div class="point-cont-item">
            <div class="point-cont-item-left">
              <div class="point-cont-item-left-box">
                <img src="@assets/img/jiegou.png" alt="" class="left-box-one" />
                <div class="left-box-info">人口结构</div>
              </div>
            </div>
            <div class="point-cont-item-right">
              <div class="item-right-box">
                <div class="item-right-title">男女比例：</div>
                <div class="item-right-info">女性偏多</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">年龄结构：</div>
                <div class="item-right-info">19-35岁年龄群体较多</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title title-two">
                  稳定/流动人口占比：
                </div>
                <div class="item-right-info info-two">人员较为稳定</div>
              </div>
            </div>
          </div>
          <div class="point-cont-item">
            <div class="point-cont-item-left">
              <div class="point-cont-item-left-box">
                <img src="@assets/img/Graph.png" alt="" class="left-box-two" />
                <div class="left-box-info">商业成熟度</div>
              </div>
            </div>
            <div class="point-cont-item-right">
              <div class="item-right-box">
                <div class="item-right-title">教育配套：</div>
                <div class="item-right-info">
                  幼儿园3所、小学2所、大学1所、初中2所
                </div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">医疗配套：</div>
                <div class="item-right-info">三甲医院3所</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">休闲购物：</div>
                <div class="item-right-info">
                  大型商场3个、超市23家、便利店2家、电影院1家、游乐场1家
                </div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">美食餐饮：</div>
                <div class="item-right-info">
                  知名餐饮200家、快餐12家、自助餐1家
                </div>
              </div>
            </div>
          </div>
          <div class="point-cont-item">
            <div class="point-cont-item-left">
              <div class="point-cont-item-left-box">
                <img
                  src="@assets/img/jiaotong.png"
                  alt=""
                  class="left-box-three"
                />
                <div class="left-box-info">交通可达性</div>
              </div>
            </div>
            <div class="point-cont-item-right">
              <div class="item-right-box">
                <div class="item-right-title">地铁站：</div>
                <div class="item-right-info">3个</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">公交站：</div>
                <div class="item-right-info">14个</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">停车场：</div>
                <div class="item-right-info">2个</div>
              </div>
            </div>
          </div>
          <div class="point-cont-item">
            <div class="point-cont-item-left">
              <div class="point-cont-item-left-box">
                <img
                  src="@assets/img/fangchan.png"
                  alt=""
                  class="left-box-fangchan"
                />
                <div class="left-box-info">房产消费</div>
              </div>
            </div>
            <div class="point-cont-item-right">
              <div class="item-right-box">
                <div class="item-right-title">住宅：</div>
                <div class="item-right-info">均价：59039元/m</div>
              </div>
              <div class="item-right-box">
                <div class="item-right-title">住宅：</div>
                <div class="item-right-info">租金：10元/m²/天</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: "PointDrawer",
  props: ["visible", "onCancel"],
  data() {
    return {};
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
.point-box {
  padding: 0 20px;
  .point-title {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #f5f5f5;
    padding: 15px 0;
    .point-title-tips {
      width: 8px;
      height: 15px;
      background-color: #28afff;
      margin-right: 10px;
    }
    .point-title-info {
      height: 15px;
      line-height: 15px;
      font-size: 14px;
      font-weight: 500;
      color: #747474;
    }
  }
  .point-tongji {
    width: 1005;
    display: flex;
    justify-content: space-between;
    padding: 25px 0 45px;
    border-bottom: 1px solid #f5f5f5;
    .point-tongji-item {
      width: 33%;
      .point-tongji-item-number-box {
        width: 76px;
        height: 76px;
        line-height: 76px;
        background: url("~@assets/img/point-number-bg.png") no-repeat;
        background-size: 100% 100%;
        font-size: 16px;
        font-weight: 500;
        color: #494949;
        text-align: center;
        margin: 0 auto;
      }
      .point-tongji-item-info {
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #747474;
      }
    }
  }
  .point-cont {
    padding: 40px 0 0;
    .point-cont-item {
      background-color: #f4f4f4;
      border-radius: 4px;
      display: flex;
      margin-bottom: 10px;
      padding: 30px 20px;
      .point-cont-item-left {
        width: 25%;
        position: relative;
        .point-cont-item-left-box {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          .left-box-info {
            margin-top: 10px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #5e5e5e;
          }
          .left-box-one {
            width: 76px;
            height: 71px;
          }
          .left-box-two {
            width: 76px;
            height: 60px;
          }
          .left-box-thee {
            width: 70px;
            height: 68px;
          }
          .left-box-four {
            width: 69px;
            height: 68px;
          }
        }
      }
      .point-cont-item-right {
        width: 75%;
        .item-right-box {
          display: flex;
          margin-bottom: 10px;
          .item-right-title {
            width: 30%;
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            color: #5e5e5e;
          }
          .item-right-info {
            width: 70%;
            font-size: 14px;
            line-height: 20px;
            color: #858585;
          }
          .title-two {
            width: 60%;
          }
          .info-two {
            width: 40%;
          }
        }
      }
    }
  }
}
</style>
