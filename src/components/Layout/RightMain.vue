<template>
  <div class="rightMain">
    <div class="main-box">
      <transition name="el-zoom-in-top">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.rightMain {
  width: 100%;
  height: 100%;
  .main-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
