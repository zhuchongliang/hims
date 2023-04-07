import { defineStore } from "pinia";

import { ref } from "vue"

import type { IPageProps } from "@/components/common/table/type";

import { mapMenuToTree } from "@/utils/map-menu";

import {
  getPageItemList,
  deletePageListItem,
  editPageListItem,
  newPageListItem,
  searchPageList,
  deletePageListItems
} from "@/service/main/system";

const useSystemStore = defineStore("system", () => {
  const userTotalCount = ref(0);
  const userList = ref<any[]>([]);

  const roleTotalCount = ref(0);
  const roleList = ref<any[]>([]);

  const menuList = ref<any[]>([]);

  const officeInfoList = ref<any[]>([]);
  const officeInfoTotalCount = ref(0);

  const stockList = ref<any[]>([]);
  const stockTotalCount = ref(0);

  const enterList = ref<any[]>([]);
  const enterTotalCount = ref(0);

  const prescriptionList = ref<any[]>([]);
  const prescriptionTotalCount = ref(0);

  const drugList = ref<any[]>([]);
  const drugTotalCount = ref(0);

  const getPageItemListAction = async (pageName: string, pageInfo: IPageProps) => {
    const result = await getPageItemList(pageName, {
      offset: ((pageInfo.currentPage) - 1) * pageInfo.pageSize,
      size: pageInfo.pageSize
    });
    if (!result) return;
    const { list, totalCount } = result;

    const curPageName = pageName.split("/")[1];

    switch(curPageName) {
      case "user":
        userList.value = list;
        userTotalCount.value = totalCount;
        break;
      case "menu":
        menuList.value = mapMenuToTree(list);
        break;
      case "role":
        roleList.value =  list;
        roleTotalCount.value = totalCount;
        break;
      case "officeInfo":
        officeInfoList.value = list;
        officeInfoTotalCount.value = totalCount;
        break;
      case "stock":
        stockList.value = list;
        stockTotalCount.value = totalCount
        break;
      case "prescription":
        prescriptionList.value = list;
        prescriptionTotalCount.value = totalCount
        break;
      case "enter":
        enterList.value = list;
        enterTotalCount.value = totalCount
        break;
      case "drug":
        drugList.value = list;
        drugTotalCount.value = totalCount
        break;
    }
  }

  const deleteListItemAction = async (pageName: string, id: number) => {
    const result = await deletePageListItem(pageName, id);
    if (!result) return;
  }

  const editPageListItemAction = async (pageName: string, itemInfo: any) => {
    const result = await editPageListItem(pageName, itemInfo);
    if (!result) return;
  }

  const newPageListItemAction = async (pageName: string, newData: any) => {
    const result = await newPageListItem(pageName, newData);
    if (!result) return;
  }

  const searchPageListAction = async (pageName: string, searchInfo: string, pageInfo: IPageProps) => {
    const result = await searchPageList(pageName, searchInfo, {
      offset: ((pageInfo.currentPage) - 1) * pageInfo.pageSize,
      size: pageInfo.pageSize
    });
    if (!result) return;

    const { list, totalCount } = result;

    const curPageName = pageName.split("/")[1];

    switch(curPageName) {
      case "user":
        userList.value = list;
        userTotalCount.value = totalCount;
      case "menu":
        menuList.value = mapMenuToTree(list);
      case "role":
        roleList.value =  list;
        roleTotalCount.value = totalCount;
      case "officeInfo":
        officeInfoList.value = list;
        officeInfoTotalCount.value = totalCount;
        break;
      case "stock":
        stockList.value = list;
        stockTotalCount.value = totalCount
        break;
      case "prescription":
        prescriptionList.value = list;
        prescriptionTotalCount.value = totalCount
        break;
      case "enter":
        enterList.value = list;
        enterTotalCount.value = totalCount
        break;
      case "drug":
        drugList.value = list;
        drugTotalCount.value = totalCount
        break;
    }
  }

  const deleteListItemsAction = async (pageName: string, selections: any[]) => {
    const idList = selections.map(v => v.id);
    const result = await deletePageListItems(pageName, idList);
    if (!result) return;
  }

  return {
    userList,
    userTotalCount,
    roleList,
    roleTotalCount,
    menuList,
    officeInfoList,
    officeInfoTotalCount,
    stockList,
    stockTotalCount,
    enterList,
    enterTotalCount,
    prescriptionList,
    prescriptionTotalCount,
    drugList,
    drugTotalCount,
    getPageItemListAction,
    deleteListItemAction,
    editPageListItemAction,
    newPageListItemAction,
    searchPageListAction,
    deleteListItemsAction
  }
})
export default useSystemStore;
