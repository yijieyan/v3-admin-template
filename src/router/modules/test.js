import { shallowRef } from "vue";
import Layout from "@/layout/index.vue";

const testRouter = {
  path: "/test",
  component: shallowRef(Layout),
  redirect: "/test/demo",
  name: "Test",
  meta: {
    title: "test",
    apiUrl: "root",
    icon: "",
  },
  children: [
    {
      path: "/test/demo",
      name: "TestDemo",
      component: () => import("@/views/Test/index.vue"),
      meta: {
        title: "demo",
        apiUrl: "root",
      },
    },
  ],
};
export default testRouter;
