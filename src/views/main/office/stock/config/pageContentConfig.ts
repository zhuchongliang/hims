import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    { prop: 'officeId', label: '药房  id', minWidth: '120' },
    {prop: "id", label: "库存记录id", minWidth: '120'},
    { prop: 'drugId', label: '药品id', minWidth: '120' },
    { prop: "name", label: "药品名称", minWidth: "120" },
    { prop: 'drugCount', label: '药品数量', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  ],
  showIndexColumn: true,
  showSelectColumn: true,
}

export default pageContentConfig;
