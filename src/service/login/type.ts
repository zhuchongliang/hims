export interface IAccount {
  name: string
  password: string
}
export interface ILoginInfo {
  name: string,
  id: number,
  token: string,
  roleId: number,
  officeId?: number
}
interface IMenuItem {
  id: number
  type: number
  parentId: number | null
  name: string
  url: string
}
export type IMenuList = IMenuItem[];
export interface IMenuInfo {
  menuList: IMenuList
  roleId: number
}
