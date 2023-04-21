import request from "../../index"

import type { IUserEntireInfo } from "./type"

export function getUserEntireInfo() {
  return request.request<IUserEntireInfo>({
    url: "/user/info",
    method: "get"
  })
}
export function updateUserEntireInfo(id: number, userInfo: any) {
  return request.request({
    url: `/user/${id}`,
    method: "patch",
    data: userInfo
  })
}
export function getRecordList() {
  return request.request({
    url: `/record/list`,
    method: "get"
  })
}
