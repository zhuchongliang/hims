import request from "../index";

import type { IAccount, ILoginInfo } from "./type"
import type { IMenuInfo } from "./type"

export function login(account: IAccount) {
  return request.request<ILoginInfo>({
    method: "post",
    data: {
      name: account.name,
      pwd: account.password
    },
    url: "/login"
  })
}
export function getMenuList(roleId: number) {
  return request.request<IMenuInfo>({
    method: "get",
    url: `/role/${roleId}/menu`
  })
}
export function getEntireMenuList() {
  return request.request<any[]>({
    method: "get",
    url: `/menu/list`
  })
}
