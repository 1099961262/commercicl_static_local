<template>
  <div class="left-manu">
    <el-menu
      :default-active="activeRouter"
      @select="handleSelect"
      class="el-menu-vertical-demo"
      background-color="#2c4792"
      text-color="#fff"
      active-text-color="#fff"
      :unique-opened="true"
      :router="true"
    >
      <template v-for="item in menus">
        <!-- 无子菜单的 -->
        <template v-if="item.isOneMenu">
          <el-menu-item
            :index="item.children[0].path"
            :key="item.children[0].path"
            class="menu-item"
          >
            <i v-if="item.children[0].icon" :class="item.children[0].icon"></i>
            <span slot="title">{{ item.children[0].name }}</span>
          </el-menu-item>
        </template>
        <!-- 有子菜单 -->
        <el-submenu
          v-if="!item.isOneMenu"
          :index="item.path"
          :key="item.path"
          class="menu-item"
        >
          <template slot="title">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="v in item.children">
            <el-menu-item
              :key="v.path"
              :index="v.path"
              class="menu-item"
              v-if="v.visible"
              >{{ v.name }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@utils/local";

export default {
  components: {},
  data() {
    return {
      menus: local.get("menus") || [],
      activeRouter: "",
    };
  },
  created() {
    this.activeRouter =
      local.get("activeRouter") || this.menus[0].children[0].path;
  },
  methods: {
    handleSelect(e) {
      // this.activeRouter = e;
      // local.set("activeRouter", e);
    },
  },
};
</script>

<style lang="less" scoped>
.left-manu {
  width: 248px;
  height: 100%;
  background-color: #2c4792;
}
.el-menu-vertical-demo {
  border: none;
}
.menu-item,
/deep/ .menu-item > div {
  text-align: left;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
/deep/ .el-submenu__title {
  font-size: 16px !important;
}
.el-menu-item i,
.el-submenu /deep/ i {
  color: #fff;
}
.el-menu-item.is-active {
  background-color: #6983cb !important;
}
.menu-item:hover {
  background-color: #6983cb !important;
}
.menu-item /deep/ div:hover {
  background-color: #6983cb !important;
}
</style>
