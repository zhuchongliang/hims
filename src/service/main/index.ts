import request from "../index"

import type { IUserEntireInfo } from "./type"

export function getUserEntireInfo() {
  return request.request<IUserEntireInfo>({
    url: "/user/info",
    method: "get"
  })
}
