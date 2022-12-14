<template>
  <div
    v-if="getSetting.mode === 'vertical' || getMenubar.isPhone"
    class="flex items-center px-4 flex-wrap h-12 leading-12"
  >
    <el-icon
      class="text-2xl cursor-pointer h-12 leading-12"
      @click="changeCollapsed"
    >
      <el-icon-expand v-if="getMenubar.status" />
      <el-icon-fold v-else />
    </el-icon>
    <!-- 面包屑导航 -->
    <div class="px-4">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item key="/" :to="{ path: '/' }"
            >主页</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-for="v in data.breadcrumbList"
            :key="v.path"
            :to="v.path"
            >{{ v.title }}</el-breadcrumb-item
          >
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
  <div v-else class="flex items-center px-4 flex-wrap h-12 flex-1">
    <div
      class="layout-sidebar-logo flex relative shadow-lg w-40 leading-12 items-center"
    >
      <img class="w-6 h-8" :src="icon" />
      <span
        v-if="getMenubar.status === 0 || getMenubar.status === 2"
        class="pl-2"
        >hsianglee</span
      >
    </div>
    <div class="layout-sidebar-menubar flex flex-1 overflow-hidden">
      <layout-menubar />
    </div>
  </div>
  <div class="flex items-center flex-row-reverse px-4 min-width-32">
    <!-- 用户下拉 -->
    <el-dropdown>
      <span class="el-dropdown-link flex flex-center px-2">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="ml-2">{{ userInfo.name }}</span>
        <el-icon><el-icon-arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <Screenfull />
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { useRoute } from "vue-router";
import Screenfull from "@/layout/components/screenfull.vue";
import LayoutMenubar from "@/layout/components/menubar.vue";
import icon from "@/assets/img/icon.png";

// 面包屑导航
const breadcrumb = (route) => {
  const fn = () => {
    const breadcrumbList = [];
    const notShowBreadcrumbList = ["Dashboard", "RedirectPage"]; // 不显示面包屑的导航
    if (
      route.matched[0] &&
      notShowBreadcrumbList.includes(route.matched[0].name)
    )
      return breadcrumbList;
    route.matched.forEach((v) => {
      const obj = {
        title: v.meta.title,
        path: v.path,
      };
      breadcrumbList.push(obj);
    });
    return breadcrumbList;
  };
  let data = reactive({
    breadcrumbList: fn(),
  });
  watch(
    () => route.path,
    () => (data.breadcrumbList = fn())
  );
  return { data };
};

export default defineComponent({
  name: "LayoutNavbar",
  components: {
    Screenfull,
    LayoutMenubar,
  },
  setup() {
    const { getMenubar, getUserInfo, changeCollapsed, logout, getSetting } =
      useLayoutStore();
    const route = useRoute();
    return {
      getMenubar,
      userInfo: getUserInfo,
      changeCollapsed,
      logout,
      ...breadcrumb(route),
      getSetting,
      icon,
    };
  },
});
</script>

<style lang="postcss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
