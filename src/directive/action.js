import { checkPermission } from "@/utils/permission";

const actionPermission = (el, binding) => {
  const value =
    typeof binding.value === "string" ? [binding.value] : binding.value;
  const arg = binding.arg === "and" ? "and" : "or";
  if (!checkPermission(value, arg)) {
    el.parentNode && el.parentNode.removeChild(el);
  }
};

export default (app) => {
  app.directive("action", {
    mounted: (el, binding) => actionPermission(el, binding),
  });
};
