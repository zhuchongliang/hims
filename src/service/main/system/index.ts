import request from "@/service/index"

import type { IMenuName, IQueryInfo, IPageData } from "./type"


export function getMenuNameByUrl(url: string) {
  return request.request<IMenuName>({
    url: `/menu/info?url=${url}`,
    method: "get"
  })
}


export function getPageItemList(pageName: string, queryInfo: IQueryInfo) {
  return request.request<IPageData>({
    method: "post",
    url: `${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageListItem(pageName: string, id: number) {
  return request.request({
    method: "delete",
    url: `${pageName}/${id}`
  })
}
export function deletePageListItems(pageName: string, idList: number[]) {
  return request.request({
    method: "delete",
    url: `${pageName}`,
    data: {
      idList: idList
    }
  })
}

export function editPageListItem(pageName: string, itemInfo: any) {
  return request.request({
    method: "patch",
    url: `${pageName}/${itemInfo.id}`,
    data: itemInfo
  })
}

export function newPageListItem(pageName: string, newData: any) {
  return request.request({
    method: "post",
    url: `${pageName}`,
    data: newData
  })
}

export function searchPageList(pageName: string, searchInfo: string, queryInfo: IQueryInfo) {
  return request.request({
    method: "post",
    url: `${pageName}/search?queryInfo=${searchInfo}`,
    data: queryInfo
  })
}
