import type { IButton, IInput } from "@/components/content/page-search/type"

interface ISearchConfig {
  buttonList: IButton[],
  input: IInput
}

let pageSearchConfig: ISearchConfig = {
  buttonList: [
    {
      label: "刷新",
      iconName: "Refresh",
      color: "#40485B",
      emitEvent: "refresh"
    },
    {
      label: "添加",
      iconName: "Plus",
      color: "#409Eff",
      emitEvent: "add"
    }
  ],
  input: {
    placeholder: "请输入要查询的内容",
    style: {
      width: "200px"
    }
  }
}

export default pageSearchConfig
