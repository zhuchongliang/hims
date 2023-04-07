import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建调库记录',
  formItems: [
    { field: 'officeId', type: 'input', label: '药房id', placeholder: '请输入当前药房id' },
    { field: 'drugId', type: "input", label: "药品id", placeholder: "请输入药品id" },
    { field: 'count', type: "input", label: "药品数量", placeholder: "请输入药品数量" },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  labelWidth: "100"
}

export default modalConfig;
