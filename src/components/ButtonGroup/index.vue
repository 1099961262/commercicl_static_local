<template>
  <el-row>
    <el-button
      v-for="item in data"
      :key="item.value"
      type="primary"
      plain
      @click="getChage(item.value)"
      >{{ item.label }}</el-button
    >
  </el-row>
</template>

<script>
export default {
  props: {
    // 按钮数据
    data: {
      required: true,
      type: Array,
      default: () => {
        return [{ label: "aaa", value: "1" }];
      },
    },
    buttonChange: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    getChage(e) {
      this.buttonChange(e);
    },
  },
};
</script>

<style lang="less" scoped></style>
