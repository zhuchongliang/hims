export interface IButton {
  label: string
  iconName: string
  color: string
  emitEvent: EmitEventType
}
export interface IInput {
  placeholder?: string
  style?: any
}

export type EmitEventType = "add" | "delete" | "refresh" | "search"
