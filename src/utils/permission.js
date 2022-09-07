import router from "../router/index";
export function checkPermission(
  permission,
  type
) {
  const value = typeof permission === "string" ? [permission] : permission;
  const currentRoute = router.currentRoute.value;
  const roles = (currentRoute.meta.permission || []);
  const isShow = type === "and" ? value.every((v) => roles.includes(v)) : value.some((v) => roles.includes(v));
  return isShow;
}
