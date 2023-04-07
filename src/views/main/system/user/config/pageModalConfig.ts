import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新用户',
  formItems: [
    { field: 'name', type: 'input', label: '用户名', placeholder: '请输入用户名' },
    { field: 'pwd', type: "input", label: "密码", placeholder: "请输入密码" },
    {
      field: "roleId",
      type: "select",
      label: "角色id",
      placeholder: "请选择角色id",
      options: [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "3", label: "3"}
      ]
    },
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
