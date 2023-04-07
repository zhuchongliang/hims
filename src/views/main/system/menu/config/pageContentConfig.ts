import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "菜单id", minWidth: '120'},
    { prop: 'name', label: '菜单名', minWidth: '120' },
    { prop: 'type', label: '菜单级别', minWidth: '120' },
    { prop: 'parentId', label: '父级菜单id', minWidth: '120' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
  ],
  showIndexColumn: true,
  showSelectColumn: false,
  showPagination: false,
  showEditButton: true
}

export default pageContentConfig;
