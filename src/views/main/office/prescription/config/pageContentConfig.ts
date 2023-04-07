import type { IContentConfig } from "@/components/content/page-content/type";
let pageContentConfig: IContentConfig = {
  propsList: [
    {prop: "id", label: "处方id", minWidth: '120'},
    { prop: 'officeId', label: '药房id', minWidth: '120' },
    { prop: 'illness', label: '病状', minWidth: '150' },
    { prop: 'drugId', label: '药品id', minWidth: '120' },
    { prop: 'count', label: '药品数量', minWidth: '120' },
    { prop: 'doctor', label: '门诊医生', minWidth: '150' },
    { prop: "remark", label: "备注", minWidth: "200"},
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true,
}

export default pageContentConfig;
