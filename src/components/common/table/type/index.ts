export interface IChildrenProps {
  rowKey?: string,
  treeProps?: {
    children?: string,
    hasChildren?: string
  }
}

export interface IPageProps {
  currentPage: number
  pageSize: number
}
