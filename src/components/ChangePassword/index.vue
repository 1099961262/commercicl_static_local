<template>
  <el-dialog
    title="修改密码"
    :visible="modalVisible"
    :close-on-click-modal="closeOnClickModal"
    width="700px"
    :modal-append-to-body="closeOnClickModal"
    @close="closeModal"
  >
    <div>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="modalData"
        label-position="right"
        label-width="120px"
        style="width: 80%; margin-left: 50px"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input
            v-model="modalData.oldPwd"
            placeholder="请输入原密码"
            :type="passwordType"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input
            v-model="modalData.newPwd"
            placeholder="请输入新密码"
            :type="passwordType"
            prefix-icon="el-icon-lock"
            @change="valiInput"
          />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confPassword">
          <el-input
            v-model="modalData.confPassword"
            placeholder="请再次输入新密码"
            :type="passwordType"
            prefix-icon="el-icon-lock"
            @change="valiInput"
          />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeVisible"> 取消 </el-button>
      <el-button type="primary" @click="createData"> 提交 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validatePassword } from "@utils/utils";
import { mapState, mapActions } from "vuex";
import local from "@utils/local";
import { encryption } from "@utils/utils.js";

export default {
  name: "ChangePassword",
  //   父组件传递属性
  props: {
    // 用于接收父组件发送过来的文件数据
    currentData: {
      required: true,
      type: Object,
    },
    // 模态框是否可见
    modalVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
    // 组件类型 模态框是用于 新增或者修改
    type: {
      type: String,
      default: "create",
    },
    // 表单默认是不允许点遮罩层关闭的
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 模态框 表单数据
      modalData: {
        oldPwd: null,
        newPwd: null,
        confPassword: null,
      },
      passwordType: "password",
      rules: {
        // 旧密码校验
        oldPwd: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
          },
          {
            pattern: /^[a-zA-Z0-9_]{6,18}$/,
            message: "只能输入6-20个字母、数字、下划线",
          },
        ],
        // 密码校验
        newPwd: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: this.validataPassword,
          },
        ],
        confPassword: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: this.cmfValidataPassword,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("account", ["LoadingStatus"]),
  },
  created() {},
  methods: {
    ...mapActions("account", ["updatePwd", "loginOut"]),

    // 关闭模态框
    closeModal() {
      this.$emit("update:modalVisible", false);
    },
    // 取消并关闭模态框
    changeVisible() {
      this.$emit("update:modalVisible", false);
    },
    // 新增提交
    createData() {
      this.$message({
        message: "密码修改成功,3秒钟后将返回登录页面",
        type: "success",
      });
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
    valiInput() {
      this.$refs["dataForm"].validate((valid) => {
        if (!valid) {
          return;
        }
      });
    },
    // 表单密码校验
    validataPassword(rule, value, callback) {
      // 先判断输入了确认密码
      if (this.modalData.confPassword) {
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (!validatePassword(value)) {
          callback(new Error("只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      } else {
        if (!value) {
          callback(new Error("密码不能为空"));
        } else if (!validatePassword(value)) {
          callback(new Error("只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      }
    },
    // 确认密码校验
    cmfValidataPassword(rule, value, callback) {
      if (this.modalData.newPwd) {
        if (!value) {
          callback(new Error("请输入确认密码"));
        } else if (!(value === this.modalData.newPwd)) {
          callback(new Error("两次输入的密码不一致"));
        } else if (!validatePassword(value)) {
          callback(new Error("只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      } else {
        if (!value) {
          callback(new Error("密码不能为空"));
        } else if (!validatePassword(value)) {
          callback(new Error("只能输入6-20个字母、数字、下划线"));
        } else {
          callback();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  .layout-box {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
  }
}
</style>
