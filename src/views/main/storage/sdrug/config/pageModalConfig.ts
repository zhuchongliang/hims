import type { IForm } from "@/components/common/form/type"

export const modalConfig: IForm = {
  title: '新建/更新药品信息',
  formItems: [
    { field: 'price', type: 'input', label: '药品价格:', placeholder: '请输入药品价格' },
    { field: 'name', type: 'input', label: '药品名称:', placeholder: '请输入药品名称' },
    { field: 'intro', type: 'input', label: '药品简介:', placeholder: '请输入药品简介' },
    { field: 'producer', type: "input", label: "药品生产商:", placeholder: "请输入药品生产商" },
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 },
  labelWidth: "100"
}

export default modalConfig;
