import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新用户',
  formItems: [
    { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
    { field: 'pwd', type: "input", label: "密码", placeholder: "请输入密码" },
    { field: 'roleId', type: "input", label: "角色id", placeholder: "请输入角色id" },
    {
      field: 'enable',
      type: 'select',
      label: "状态",
      placeholder: "请选择用户状态",
      options: [
        {value: "1", label: "活跃"},
        {value: "0", label: "禁用"}
      ]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

export default modalConfig;
