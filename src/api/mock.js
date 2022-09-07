import request from "@/utils/request";

export function getTableList(tableList) {
  return request({
    url: "/api/getTableList",
    method: "get",
    params: tableList,
  });
}

export function login(param) {
  return request({
    url: "/api/User/login",
    method: "post",
    data: param,
  });
}

export function publickey() {
  return request({
    url: "/api/User/Publickey",
    method: "get",
  });
}

export function getUser() {
  return request({
    url: "/api/User/getUser",
    method: "get",
  });
}
export function getRouterList() {
  return request({
    url: "/api/User/getRoute",
    method: "get",
  });
}
