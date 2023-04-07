import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建门诊处方',
  formItems: [
    { field: 'illness', type: 'input', label: '病状', placeholder: '请输入病状' },
    { field: 'drugId', type: "input", label: "药品id", placeholder: "请输入药品id" },
    { field: 'count', type: "input", label: "药品数量", placeholder: "请输入药品数量" },
    { field: 'remark', type: "input", label: "备注", placeholder: "请输入备注" },
    { field: 'officeId', type: "input", label: "当前药房id", placeholder: "请输入当前药房id" },
    { field: 'doctor', type: "input", label: "门诊医生", placeholder: "请输入门诊医生" },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  labelWidth: "100"
}

export default modalConfig;
