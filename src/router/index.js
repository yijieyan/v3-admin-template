import { createRouter, createWebHashHistory } from "vue-router";

import testRouter from "./modules/test";

import Layout from "@/layout/index.vue";
// 静态路由页面
export const allowRouter = [
  {
    name: "Dashboard",
    path: "/",
    component: Layout,
    redirect: "/Dashboard/Workplace",
    meta: { title: "仪表盘", icon: "el-icon-eleme" },
    children: [
      {
        name: "Workplace",
        path: "/Dashboard/Workplace",
        component: () => import("@/views/Dashboard/Workplace/index.vue"),
        meta: { title: "工作台", icon: "el-icon-tools" },
      },
    ],
  },
  {
    name: "ErrorPage",
    path: "/ErrorPage",
    meta: { title: "错误页面", icon: "el-icon-eleme" },
    component: Layout,
    redirect: "/ErrorPage/404",
    children: [
      {
        name: "401",
        path: "/ErrorPage/401",
        component: () => import("@/views/ErrorPage/401.vue"),
        meta: { title: "401", icon: "el-icon-tools" },
      },
      {
        name: "404",
        path: "/ErrorPage/404",
        component: () => import("@/views/ErrorPage/404.vue"),
        meta: { title: "404", icon: "el-icon-tools" },
      },
    ],
  },
  {
    name: "RedirectPage",
    path: "/redirect",
    component: Layout,
    meta: { title: "重定向页面", icon: "el-icon-eleme", hidden: true },
    children: [
      {
        name: "Redirect",
        path: "/redirect/:pathMatch(.*)*",
        meta: {
          title: "重定向页面",
          icon: "",
        },
        component: () => import("@/layout/redirect.vue"),
      },
    ],
  },
  {
    name: "Login",
    path: "/Login",
    component: () => import("@/views/User/Login.vue"),
    meta: { title: "登录", icon: "el-icon-eleme", hidden: true },
  },
];
//动态路由
export const asyncRoutes = [
  testRouter,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/ErrorPage/404.vue"),
    meta: {
      title: "NotFound",
      icon: "",
      hidden: true,
    },
    redirect: {
      name: "404",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: allowRouter,
});

export default router;
