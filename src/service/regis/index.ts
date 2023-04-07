import request from "../index";
import type { IRegisInfo } from "./type";

export function regis(regisInfo: IRegisInfo) {
  return request.request<any>({
    url: '/user',
    method: "post",
    data: {
      name: regisInfo.name,
      pwd: regisInfo.password,
      roleId: 1
    }
  })
}
