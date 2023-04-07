import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新用户',
  formItems: [
    { field: 'drugCount', type: 'input', label: '药品数量', placeholder: '请输入药品数量' },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

export default modalConfig;
