import type { IMenuList } from "@/service/login/type";
import type { RouteRecordRaw } from "vue-router"

export interface IMenuTree {
  name: string,
  type: number,
  children: IMenuTree[],
  iconName: string,
  url: string
}

export function mapMenuToTree(menuList: IMenuList): IMenuTree[] {
  let map = new Map();
  let res: IMenuTree[] = [];
  menuList.forEach((val) => {
    map.set(val.id, {
      id: val.id,
      type: val.type,
      name: val.name,
      iconName: val.url.split("/").pop(),
      children: [],
      url: val.url,
      parentId: val.parentId
    });
  })
  menuList.forEach((val) => {
    let curVal = map.get(val.id);

    if (val.parentId === null) {
      res.push(curVal);
    } else {
      let parent = map.get(val.parentId);
      parent.children.push(curVal);
    }
  })
  return res;
}

export function mapMenuToRoutes(userMenu: IMenuTree[]) {
  const routesAll: RouteRecordRaw[] = [];
  const routes: RouteRecordRaw[] = [];

  const routerFiles = import.meta.glob<RouteRecordRaw>("../router/main/**/*.ts", {
    import: "default",
    eager: true,
  });

  Object.keys(routerFiles).forEach((fileName) => {
    routesAll.push(routerFiles[fileName]);
  })

  recurseMapRoutes(userMenu);

  function recurseMapRoutes(userMenu: IMenuTree[]) {
    for (let menuItem of userMenu) {
      if (!menuItem.children.length) {
        const route = routesAll.find(route => route.path === menuItem.url)
        route && routes.push(route);
      } else {
        recurseMapRoutes(menuItem.children);
      }
    }
  }
  return routes;
}

export function deleteEmptyChildren(userMenu: any[], result: any[]) {
  for (let index in userMenu) {
    if (userMenu[index].children.length) {
      let curVal = userMenu[index];
      result[index] = {
        name: curVal.name,
        id: curVal.id,
        children: []
      };
      deleteEmptyChildren(userMenu[index].children, result[index].children);
    } else {
      userMenu.length;
      let curVal = userMenu[index];
      result[index] = {
        name: curVal.name,
        id: curVal.id
      };
    }
  }
  return result;
}
