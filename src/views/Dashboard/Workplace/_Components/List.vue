<template>
  <el-card shadow="hover" class="mb-2">
    <template #header>
      <div class="card-header flex justify-between items-center">
        <span>动态</span>
      </div>
    </template>
  </el-card>
</template>
<script>
import { defineComponent } from "vue";

// list初始化
const listRender = () => {
  const list = [
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
      href: "javascript:;",
    },
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
    },
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
    },
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
    },
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
    },
    {
      imgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "支付宝",
      subTitle: "斗通关无际县军连用知政以该果思快领c。",
      tag: "科学搬砖组",
      time: "9小时前",
    },
  ];
  const edit = (item) => console.log(item);
  return { list, edit };
};

export default defineComponent({
  setup() {
    return {
      ...listRender(),
    };
  },
});
</script>
