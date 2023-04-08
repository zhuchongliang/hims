import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "采购计划id", minWidth: '120'},
    { prop: 'drugId', label: '药品id', minWidth: '120' },
    { prop: 'count', label: '药品数量', minWidth: '120' },
    { prop: "status", label: "状态", minWidth: "120", slotName: "purchaseStatus" },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  notShowDeleteButton: true,
}

export default pageContentConfig;
