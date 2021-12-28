<template>
  <div class="main">
    <div class="title">
      <img src="@assets/img/wenben.png" class="title-img" />
      <span>基本信息</span>
    </div>
    <div class="content-box">
      <div class="content-item">
        <div class="item-title">用 户 名：</div>
        <div class="item-info">超级管理员</div>
      </div>
      <div class="content-item">
        <div class="item-title">账 号：</div>
        <div class="item-info">admin</div>
      </div>
      <div class="content-item">
        <div class="item-title">机构名称：</div>
        <div class="item-info">顶级机构</div>
      </div>
      <div class="content-item">
        <div class="item-title">授权时间：</div>
        <div class="item-info">2021-12-21</div>
      </div>
      <div class="content-item">
        <div class="item-title">密 码：</div>
        <div class="item-info">
          <el-button type="primary" @click="handClick">修改密码</el-button>
        </div>
      </div>
    </div>
    <ChangePassword
      v-if="modalVisible"
      :current-data="currentData"
      :modal-visible.sync="modalVisible"
      :type="modalType"
    ></ChangePassword>
  </div>
</template>

<script>
import local from "@utils/local";
import ChangePassword from "@components/ChangePassword/index.vue";

export default {
  data() {
    return {
      userInfo: {},
      // 传入模态框的数据
      currentData: {},
      modalVisible: false,
      modalType: null,
    };
  },
  components: { ChangePassword },
  created() {
    this.userInfo = local.get("userInfo") || {};
  },
  methods: {
    handClick() {
      this.modalType = "create";
      this.modalVisible = true;
      this.currentData = {};
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 6px 10px;
}

.title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
  text-align: left;
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
}
.content-box {
  border: 1px solid #e5e5e5;
  padding-bottom: 300px;
  .content-item {
    border-bottom: 1px solid #e5e5e5;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
    color: #3a3a3a;
    display: flex;
    justify-content: flex-start;
    padding: 0 20px;
    .item-title {
      width: 200px;
    }
  }
}
</style>
