import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新角色',
  formItems: [
    { field: 'name', type: 'input', label: '角色名', placeholder: '请输入角色名' },
    { field: 'intro', type: "input", label: "角色简介", placeholder: "请输入角色简介" },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

export default modalConfig;
