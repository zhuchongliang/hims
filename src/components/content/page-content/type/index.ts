import type { IChildrenProps } from "@/components/common/table/type"
export type IContentConfig = Partial<{
  propsList: any[]
  childrenProps: IChildrenProps
  showSelectColumn: boolean
  showIndexColumn: boolean
  showPagination: boolean
  showEditButton: boolean
}>
