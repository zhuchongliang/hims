import type { RouteRecordRaw } from "vue-router"

import router from "@/router";

export function diffRoutes(oldRoutes: RouteRecordRaw[], newRoutes: RouteRecordRaw[]) {
  let map = new Map();
  let index = 0;

  oldRoutes.forEach((v, i) => {
    map.set(v.name, i);
  })

  for (let route of newRoutes) {
    const oldIndex = map.get(route.name);
    if (oldIndex === undefined) {
      router.addRoute("main", route);
      oldRoutes.unshift(route);
    } else {
      [oldRoutes[oldIndex], oldRoutes[index]] = [oldRoutes[index], oldRoutes[oldIndex]];
    }
    index++;
  }
  if (oldRoutes.length > newRoutes.length) {
    for (let i = index; i <= oldRoutes.length - 1; i++) {
      if (router.currentRoute.value.fullPath === oldRoutes[i].path) {
        router.push("/main/dashboard")
      }
      router.removeRoute(oldRoutes[i].name!);
    }
  }
}
