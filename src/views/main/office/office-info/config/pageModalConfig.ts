import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新药房信息',
  formItems: [
    { field: 'owner', type: 'input', label: '药房管理员:', placeholder: '请输入药房管理员id' },
    { field: 'position', type: "input", label: "药房位置:", placeholder: "请输入药房位置" },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  labelWidth: "100"
}

export default modalConfig;
