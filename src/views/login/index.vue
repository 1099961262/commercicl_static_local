<template>
  <div class="mian">
    <div class="login-box">
      <div class="title-box">商圈选址系统登录</div>
      <div class="input-box">
        <div class="label">用户名：</div>
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="account"
          clearable
          autocomplete="off"
        >
        </el-input>
      </div>
      <div class="input-box">
        <div class="label">密码：</div>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          clearable
          autocomplete="new-password"
        >
        </el-input>
      </div>
      <div class="input-box">
        <div class="label">验证码：</div>
        <el-input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          clearable
          autocomplete="off"
          style="border: none !important"
        >
        </el-input>
        <el-image class="img" :src="src" @click="getCode"></el-image>
      </div>
      <div class="but-box">
        <!-- v-loading="LoadingStatus" -->
        <el-button class="button-submit" @click="submitForm"
          >立即登陆</el-button
        >
        <div class="but-tips">如忘记密码，可联系abcd@139</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { encryption } from "@utils/utils.js";
import local from "@utils/local.js";
// import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      account: "", //账号
      password: "", //密码
      code: "", //验证码
      src: "/auth/login/verifyCode", //验证码图片地址
    };
  },
  computed: {
    // ...mapState("account", ["LoadingStatus"]),
  },
  created() {
    // 获取验证码
    this.getCode();
    // local.clear();
    local.remove("activeRouter");
  },
  methods: {
    // ...mapActions("account", ["doLogin"]),
    //点击登录
    submitForm() {
      local.set("activeRouter", "/point_evaluation");
      this.$router.push("/point_evaluation");
      // if (!this.account || !this.password) {
      //   this.$message.error("请输入账号密码！");
      //   return;
      // }
      // if (!this.code) {
      //   this.$message.error("请输入验证码！");
      //   return;
      // }
      // let mpassword = encryption(this.password);
      // this.doLogin({
      //   userCode: this.account,
      //   password: mpassword,
      //   code: this.code,
      // }).then((res) => {
      //   if (res.code === "000000") {
      //     local.set("userInfo", res.data);
      //     local.set("activeRouter", "/point_evaluation");
      //     this.$router.push("/point_evaluation");
      //   }
      // });
    },
    // 获取验证码
    getCode() {
      this.src = `/auth/login/verifyCode?${new Date().getTime()}`;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
