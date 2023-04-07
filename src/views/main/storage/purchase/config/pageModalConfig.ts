import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '更新采购计划状态',
  formItems: [
    {
      field: "status",
      type: "select",
      label: "采购计划执行状态",
      placeholder: "请选择计划状态",
      options: [
        {value: "0", label: "等待审批"},
        {value: "1", label: "审批完成"},
      ]
    },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  labelWidth: "100"
}

export default modalConfig;
