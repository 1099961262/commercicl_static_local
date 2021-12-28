<template>
  <div class="header-box">
    <div class="header-title">
      <div class="title-img-box">
        <img src="@/assets/img/logo.png" alt="" class="logo-img" />
      </div>
      <div @click="toHome" class="header-title-info">选址评估平台</div>
    </div>
    <div v-show="layoutMode == 'top'">
      <div class="menu-box">
        <div
          class="menu-item"
          :class="activeMode == '/point_evaluation' ? 'active' : ''"
          @click="handMenu('/point_evaluation')"
        >
          <i class="el-icon-document"></i>
          <span>&nbsp;点位评估</span>
        </div>
        <div
          class="menu-item"
          :class="activeMode == '/address_recommend' ? 'active' : ''"
          @click="handMenu('/address_recommend')"
        >
          <i class="el-icon-location-outline"></i>
          <span>&nbsp;选址推荐</span>
        </div>
        <div
          class="menu-item"
          :class="activeMode == '/my_mission' ? 'active' : ''"
          @click="handMenu('/my_mission')"
        >
          <i class="el-icon-s-order"></i>
          <span>&nbsp;我的任务</span>
        </div>
      </div>
    </div>

    <div class="user-box">
      <div class="user-info">{{ username }}</div>
      <div class="user-img-box">
        <el-avatar
          class="user-avatar"
          size="large"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </div>
      <div class="set-box">
        <el-dropdown @command="handleCommand" trigger="click">
          <div class="but-box">
            <div class="icont-box">
              <i class="el-icon-setting"></i>
            </div>
            <div class="but-info">设置</div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">个人设置</el-dropdown-item>
            <el-dropdown-item command="change">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
import { mapState, mapActions } from "vuex";

export default {
  props: ["layoutMode"],
  components: { ChangePassword },
  data() {
    return {
      username: "",
      activeMode: "",
      // 传入模态框的数据
      currentData: {},
      modalVisible: false,
      modalType: null,
      menus: local.get("menus") || [],
    };
  },
  computed: {
    ...mapState("account", ["LoadingStatus"]),
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      if (to.path != "/personal_data" || to.path != "/log_center") {
        this.activeMode = to.path;
      }
    },
  },
  created() {
    let userInfo = local.get("userInfo");
    this.username = (userInfo && userInfo.username) || "admin";
    this.activeMode =
      local.get("activeRouter") || this.menus[0].children[0].path;
  },
  methods: {
    ...mapActions("account", ["loginOut"]),
    // 点击跳转
    handMenu(mode) {
      if (mode != this.activeMode) {
        this.activeMode = mode;
        this.$router.push(mode);
      }
    },
    // 返回首页
    toHome() {
      this.$router.push("/point_evaluation");
    },

    // 用户信息、登出、修改密码
    async handleCommand(command) {
      if (command === "change") {
        this.modalType = "create";
        this.modalVisible = true;
        this.currentData = {};
      } else if (command === "user") {
        this.$router.push("/personal_data");
      } else if (command === "logout") {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@headHeight: 80px;
.header-box {
  width: 100%;
  height: @headHeight;
  background-color: #162c69;
  display: flex;
  justify-content: space-between;

  .header-title {
    padding-left: 40px;
    height: @headHeight;
    line-height: @headHeight;
    font-size: 24px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    .title-img-box {
      cursor: pointer;
      width: 34px;
      height: @headHeight;
      position: relative;
      margin-right: 12px;
      .logo-img {
        width: 34px;
        height: 34px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .header-title-info {
      cursor: pointer;
    }
  }
  .menu-box {
    display: flex;
    justify-content: center;
    .menu-item {
      padding: 0 20px;
      height: @headHeight;
      line-height: @headHeight;
      font-size: 18px;
      font-weight: bold;
      color: #aec3ff;
      margin-right: 100px;
      cursor: pointer;
    }
    .menu-item:last-child {
      margin-right: 0;
    }
    .active {
      background-color: #6983cb;
    }
    .menu-item:hover {
      background-color: #6983cb;
    }
  }

  .user-box {
    width: 270px;
    height: @headHeight;
    padding-right: 40px;
    display: flex;
    justify-content: flex-end;
    .user-info {
      line-height: @headHeight;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
    }
    .user-img-box {
      width: 40px;
      height: @headHeight;
      position: relative;
      margin: 0 30px 0 10px;
      .user-avatar {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .set-box {
      width: 64px;
      line-height: @headHeight;
      position: relative;
    }
    .but-box {
      cursor: pointer;
      display: flex;

      .icont-box {
        height: 24px;
        color: #ffffff;
        line-height: 24px;
        font-size: 24px;
      }
      .but-info {
        width: 40px;
        padding-left: 5px;
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }
}
</style>
