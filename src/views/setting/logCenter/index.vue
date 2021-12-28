<template>
  <div class="main">
    <div class="title">
      <img src="@assets/img/wenben.png" class="title-img" />
      <span>使用记录</span>
    </div>
    <div class="content-box">
      <el-table
        v-loading="LoadingStatus"
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
          prop="userName"
          label="用户名"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="userCode"
          label="账号"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="organName"
          label="机构名称"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="loginCount"
          label="登录次数"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="taskCount"
          label="任务个数"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="cheackLog(scope)" type="text"
              >登录日志</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="登录日志"
      :visible="modalVisible"
      :close-on-click-modal="false"
      width="700px"
      :modal-append-to-body="false"
      @close="closeModal"
      class="logBox"
    >
      <div>
        <el-table
          v-loading="LoadingStatus"
          ref="multipleTable"
          stripe
          :data="logData"
          tooltip-effect="dark"
          style="width: 100%"
          max-height="600px"
          :header-cell-style="{
            background: '#f3f3f3',
            color: '#3a3a3a',
            fontWeight: 'bold',
            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="userName"
            label="用户名"
          />
          <el-table-column
            show-overflow-tooltip
            align="center"
            prop="createTime"
            label="登录时间"
          />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import local from "@utils/local.js";

export default {
  components: {},
  data() {
    return {
      tableData: [],
      logData: [],
      // 传入模态框的数据
      modalVisible: false,
    };
  },
  computed: {
    ...mapState("account", ["LoadingStatus"]),
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions("account", ["selectLogList", "selectLogDetailList"]),
    // 请求数据
    getList() {
      this.selectLogList({ id: local.get("userInfo").id }).then((res) => {
        if (res.code === "000000") {
          this.tableData = res.data;
        }
      });
    },
    // 请求日志数据
    getLogList() {
      this.selectLogDetailList({ id: local.get("userInfo").id }).then((res) => {
        if (res.code === "000000") {
          this.logData = res.data;
        }
      });
    },
    // 查看登录日志
    cheackLog() {
      this.getLogList();
      // 传入模态框的数据
      this.modalVisible = true;
    },
    // 关闭模态框
    closeModal() {
      this.modalVisible = false;
    },
    // 取消并关闭模态框
    changeVisible() {
      this.modalVisible = false;
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
}
.logBox {
  text-align: center;
}
</style>
