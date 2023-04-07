import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "用户id", minWidth: '120'},
    { prop: 'name', label: '用户名', minWidth: '120' },
    { prop: 'pwd', label: '密码', minWidth: '120' },
    { prop: 'roleId', label: '角色id', minWidth: '120' },
    { prop: "status", label: "状态", minWidth: "120", slotName: "status"},
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
  showEditButton: true
}

export default pageContentConfig;
