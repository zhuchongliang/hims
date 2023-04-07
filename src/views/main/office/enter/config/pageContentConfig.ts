import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "调库申请id", minWidth: '120'},
    { prop: 'officeId', label: '药房id', minWidth: '120' },
    { prop: 'drugId', label: '药品id', minWidth: '120' },
    { prop: 'count', label: '药品数量', minWidth: '120' },
    { prop: "status", label: "状态", minWidth: "120", slotName: "enterStatus" },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
}

export default pageContentConfig;
