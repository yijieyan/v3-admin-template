import { defineStore } from "pinia";
import { login, getUser } from "@/api/mock";
import router, { allowRouter, asyncRoutes } from "@/router/index";
import { setLocal, getLocal, decode } from "@/utils/tools";

const setting = getLocal("setting");
const { ACCESS_TOKEN } = getLocal("token");

const IMenubarStatus = {
  PCE: 0, // 电脑展开
  PCN: 1, // 电脑合并
  PHE: 2, // 手机展开
  PHN: 3, // 手机合并
};

export const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    menubar: {
      status:
        document.body.offsetWidth < 768
          ? IMenubarStatus.PHN
          : IMenubarStatus.PCE,
      menuList: [],
      isPhone: document.body.offsetWidth < 768,
    },
    // 用户信息
    userInfo: {
      name: "",
      role: [],
    },
    // 标签栏
    tags: {
      tagsList: [],
      cachedViews: [],
      isNocacheView: false,
    },
    setting: {
      theme: setting.theme !== undefined ? setting.theme : 0,
      showTags: setting.showTags !== undefined ? setting.showTags : true,
      color: {
        primary:
          setting.color !== undefined ? setting.color.primary : "#409eff",
      },
      usePinyinSearch:
        setting.usePinyinSearch !== undefined ? setting.usePinyinSearch : false,
      mode: setting.mode || "vertical",
    },
    status: {
      isLoading: false,
      ACCESS_TOKEN: ACCESS_TOKEN || "",
    },
    permission: [],
  }),
  getters: {
    getMenubar() {
      return this.menubar;
    },
    getUserInfo() {
      return this.userInfo;
    },
    getTags() {
      return this.tags;
    },
    getSetting() {
      return this.setting;
    },
    getStatus() {
      return this.status;
    },
    getPermission() {
      return this.permission;
    },
  },
  actions: {
    changeCollapsed() {
      this.menubar.status = this.menubar.isPhone
        ? this.menubar.status === IMenubarStatus.PHN
          ? IMenubarStatus.PHE
          : IMenubarStatus.PHN
        : this.menubar.status === IMenubarStatus.PCN
        ? IMenubarStatus.PCE
        : IMenubarStatus.PCN;
    },
    changeDeviceWidth() {
      this.menubar.isPhone = document.body.offsetWidth < 768;
      this.menubar.status = this.menubar.isPhone
        ? IMenubarStatus.PHN
        : IMenubarStatus.PCE;
    },
    // 切换导航，记录打开的导航
    changeTagNavList(cRouter) {
      if (!this.setting.showTags) return; // 判断是否开启多标签页
      // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
      if (new RegExp("^/redirect").test(cRouter.path)) return;
      const index = this.tags.tagsList.findIndex(
        (v) => v.path === cRouter.path
      );
      this.tags.tagsList.forEach((v) => (v.isActive = false));
      // 判断页面是否打开过
      if (index !== -1) {
        this.tags.tagsList[index].isActive = true;
        return;
      }
      const tagsList = {
        name: cRouter.name,
        title: cRouter.meta.title,
        path: cRouter.path,
        isActive: true,
      };
      this.tags.tagsList.push(tagsList);
    },
    removeTagNav(obj) {
      const index = this.tags.tagsList.findIndex(
        (v) => v.path === obj.tagsList.path
      );
      if (this.tags.tagsList[index].path === obj.cPath) {
        this.tags.tagsList.splice(index, 1);
        const i = index === this.tags.tagsList.length ? index - 1 : index;
        this.tags.tagsList[i].isActive = true;
        this.removeCachedViews({ name: obj.tagsList.name, index });
        router.push({ path: this.tags.tagsList[i].path });
      } else {
        this.tags.tagsList.splice(index, 1);
        this.removeCachedViews({ name: obj.tagsList.name, index });
      }
    },
    removeOtherTagNav(tagsList) {
      const index = this.tags.tagsList.findIndex(
        (v) => v.path === tagsList.path
      );
      this.tags.tagsList.splice(index + 1);
      this.tags.tagsList.splice(0, index);
      this.tags.cachedViews.splice(index + 1);
      this.tags.cachedViews.splice(0, index);
      router.push({ path: tagsList.path });
    },
    removeAllTagNav() {
      this.tags.tagsList.splice(0);
      this.tags.cachedViews.splice(0);
      router.push({ path: "/redirect/" });
    },
    // 添加缓存页面
    addCachedViews(obj) {
      if (!this.setting.showTags) return; // 判断是否开启多标签页
      if (obj.noCache || this.tags.cachedViews.includes(obj.name)) return;
      this.tags.cachedViews.push(obj.name);
    },
    // 删除缓存页面
    removeCachedViews(obj) {
      // 判断标签页是否还有该页面
      if (this.tags.tagsList.map((v) => v.name).includes(obj.name)) return;
      this.tags.cachedViews.splice(obj.index, 1);
    },
    // 删除所有缓存页面并刷新当前页面
    removeAllCachedViews() {
      this.tags.cachedViews.splice(0);
      this.refreshViews();
    },
    // 刷新页面，默认刷新当前页面
    refreshViews(
      type = "replace",
      path = router.currentRoute.value.fullPath,
      name = router.currentRoute.value.name
    ) {
      this.changeNocacheViewStatus(true);
      // 删除页面的缓存
      const index = this.tags.cachedViews.findIndex((v) => v === name);
      index !== -1 && this.tags.cachedViews.splice(index, 1);
      if (type === "push") {
        router.push(`/redirect${path}`);
      } else {
        router.replace(`/redirect${path}`);
      }
    },
    changeNocacheViewStatus(isNoCache) {
      this.tags.isNocacheView = isNoCache;
    },
    logout() {
      this.status.ACCESS_TOKEN = "";
      localStorage.removeItem("token");
      history.go(0);
    },
    setToken(token) {
      this.status.ACCESS_TOKEN = token;
      setLocal("token", this.status, 1000 * 60 * 60);
    },
    setRoutes(data) {
      this.menubar.menuList = data;
    },
    concatAllowRoutes() {
      allowRouter.reverse().forEach((v) => this.menubar.menuList.unshift(v));
    },
    // 修改主题
    changeTheme(num) {
      if (num === this.setting.theme) return;
      if (typeof num !== "number") num = this.setting.theme;
      this.setting.theme = num;
      localStorage.setItem("setting", JSON.stringify(this.setting));
    },
    // 修改主题色
    changeThemeColor(color) {
      this.setting.color.primary = color;
      localStorage.setItem("setting", JSON.stringify(this.setting));
    },
    changeTagsSetting(showTags) {
      this.setting.showTags = showTags;
      localStorage.setItem("setting", JSON.stringify(this.setting));

      if (showTags) {
        const index = this.tags.tagsList.findIndex(
          (v) => v.path === router.currentRoute.value.path
        );
        if (index !== -1) {
          this.tags.tagsList.forEach((v) => (v.isActive = false));
          this.tags.tagsList[index].isActive = true;
        } else {
          this.changeTagNavList(router.currentRoute.value);
        }
      }
    },
    // 下次进去该页面刷新该页面(解决子页面保存之后，回到父页面页面不刷新问题)
    refreshPage(path) {
      const name = this.tags.tagsList.filter((v) => v.path === path)[0]?.name;
      if (!name) return;
      const index = this.tags.cachedViews.findIndex((v) => v === name);
      this.tags.cachedViews.splice(index, 1);
    },
    changemenubarMode(mode) {
      this.setting.mode = mode;
      localStorage.setItem("setting", JSON.stringify(this.setting));
    },
    async login(param) {
      const res = await login(param);
      const token = res.data.Data;
      this.status.ACCESS_TOKEN = token;
      setLocal("token", this.status, 1000 * 60 * 60);
      const { query } = router.currentRoute.value;
      router.push(typeof query.from === "string" ? decode(query.from) : "/");
    },
    async getUser() {
      const res = await getUser();
      const userInfo = res.data.Data;
      this.userInfo.name = userInfo.name;
      this.userInfo.role = userInfo.role;
    },
    async GenerateRoutes() {
      return new Promise((resolve, reject) => {
        const routerList = filterAsyncRoutes(asyncRoutes);
        const { setRoutes } = useLayoutStore();
        setRoutes(routerList);
        resolve();
      });
    },
  },
});

function hasPermission(route) {
  const permission = useLayoutStore().permission;
  let apiUrl = route.meta?.apiUrl;
  if (!apiUrl) {
    return false;
  } else if (typeof apiUrl === "string") {
    if (apiUrl === "root") {
      return true;
    }
    apiUrl = [apiUrl];
  }
  return permission.some((url) => apiUrl.includes(url));
}
export function filterAsyncRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children);
      }
      res.push(tmp);
    }
  });
  return res;
}
