interface ISeletOption {
  label: string
  value: string
}

type ItemType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string
  type: ItemType
  label?: string
  placeholder?: string
  rules?: any[]
  options?: ISeletOption[]
  otherOption?: any
  defaultValue?: any
  isHidden?: boolean
}

export interface IForm {
  title?: string
  formItems?: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
