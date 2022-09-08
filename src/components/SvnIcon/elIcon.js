import { h, defineComponent, resolveComponent } from "vue";

export function UseElIcon(icon, color = "inherit", size) {
  return defineComponent({
    name: "UseElIcon",
    render() {
      if (icon.indexOf("el-icon") > -1) {
        return h(
          resolveComponent("el-icon"),
          {
            color: color,
            size: size || "",
          },
          () => [h(resolveComponent(icon))]
        );
      } else {
        return h(resolveComponent("svg-icon"), {
          className: "cursor-pointer mr10",
          iconClass: icon,
        });
      }
      // return h(resolveComponent(icon))
    },
  });
}
