import ElementPlus from "element-plus";
import direct from "@/directive/index";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "nprogress/nprogress.css";
import "virtual:svg-icons-register";
import * as ElIcons from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvnIcon/index.vue";
export const pluginRegister = (app) => {
  direct(app);
  app.use(ElementPlus);
  app.component("SvgIcon", SvgIcon);
  const ElIconsData = ElIcons;
  for (const iconName in ElIconsData) {
    app.component(`ElIcon${iconName}`, ElIconsData[iconName]);
  }
};
