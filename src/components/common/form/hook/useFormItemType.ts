import type { IFormItem } from "../type"

export default function useFormItemConfig() {
  function getFormItemConfig(item: IFormItem): any {
    switch(item.type) {
      case "password":
        return {
          placeholder: item.placeholder,
          showPassword: true
        }
      case "select":
        return {
          placeholder: item.placeholder,
          ...item?.otherOption,
        }
      default:
        return {
          placeholder: item.placeholder
        }
    }
  }
  return [getFormItemConfig]
}
