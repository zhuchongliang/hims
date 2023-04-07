import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "药房id", minWidth: '120'},
    { prop: 'owner', label: '药房管理员id', minWidth: '120' },
    { prop: 'position', label: '药房位置', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showEditButton: true
}

export default pageContentConfig;
