import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "药品id", minWidth: '120'},
    { prop: 'price', label: '药品价格', minWidth: '120' },
    { prop: 'name', label: '药品名称', minWidth: '120' },
    { prop: 'intro', label: '药品简介', minWidth: '120' },
    { prop: 'producer', label: '药品简介', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showEditButton: true
}

export default pageContentConfig;
