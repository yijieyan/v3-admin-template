import { nextTick } from "vue";
import { format, unformat } from "@/utils/tools";

export default (app) => {
  app.directive("format", {
    beforeMount(el, binding) {
      const { arg, value } = binding;
      if (arg === "money") {
        const elem = el.firstElementChild;
        nextTick(() => (elem.value = format(elem.value)));
        elem.addEventListener(
          "focus",
          (event) => {
            if (!event.target) return;
            const target = event.target;
            target.value = String(unformat(target.value));
            value[0][value[1]] = target.value;
          },
          true
        );
        elem.addEventListener(
          "blur",
          (event) => {
            if (!event.target) return;
            const target = event.target;
            const val = unformat(format(target.value));
            value[0][value[1]] = val === "" ? 0 : val;
            nextTick(() => (target.value = format(val)));
          },
          true
        );
      }
    },
  });
};
