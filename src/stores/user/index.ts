import { defineStore } from "pinia";
import { reactive, ref } from "vue"

import { getEntireMenuList, getMenuList, login } from "@/service/login/index"
import { getUserEntireInfo, updateUserEntireInfo } from "@/service/main/my";
import { regis } from "@/service/regis";

import type { IUserInfo } from "./type"
import type { IAccount } from "@/service/login/type"
import type { IRegisInfo } from "@/service/regis/type";
import type { IUserEntireInfo } from "@/service/main/my/type";

import cache from "@/utils/cache"
import { mapMenuToRoutes, mapMenuToTree } from "@/utils/map-menu";
import type { IMenuTree } from "@/utils/map-menu";
import { diffRoutes } from "@/utils/diff-routes";

import router from "@/router";

const addRoute = (userMenu: IMenuTree[]) => {
  const routes = mapMenuToRoutes(userMenu);
  routes.forEach(route => router.addRoute("main", route));
}

const useUserStore =  defineStore("user", () => {
  const userInfo = reactive<IUserInfo>({})
  const userMenu = ref<IMenuTree[]>();
  const userEntireInfo = ref<IUserEntireInfo>();
  const menuEntireInfo = ref<any[]>();

  const accountLogin = async (account: IAccount) => {
    const res = await login(account);
    if (res) {
      userInfo.id = res.id;
      userInfo.roleId = res.roleId;
      userInfo.officeId = res.officeId;
      cache.set("userInfo", userInfo);
      cache.set("token", res.token);

      let menuList = await getMenuList(userInfo.roleId);
      if (menuList) {
        userMenu.value = mapMenuToTree(menuList.menuList);
        cache.set("userMenu", userMenu.value);
        addRoute(userMenu.value);
      }
      let entireInfo = await getEntireMenuList();
      if (entireInfo) {
        menuEntireInfo.value = entireInfo;
        cache.set("entireMenu", entireInfo);
      }
    }
    return res;
  }

  const accountRegis = async (regisInfo: IRegisInfo) => {
    const result = await regis(regisInfo);
    return result;
  }

  const loadLoginCache = async () => {
    if (cache.get("userInfo")) {
      let cacheUserInfo = cache.get("userInfo");
      userInfo.id = cacheUserInfo.id;
      userInfo.roleId = cacheUserInfo.roleId;
      userInfo.officeId = cacheUserInfo.officeId;
    }
    if (cache.get("userMenu")) {
      //先正确响应导航
      const cacheUserMenu = cache.get("userMenu");
      userMenu.value = cacheUserMenu;
      addRoute(cacheUserMenu);

      //重新设置路由表
      const menuList = await getMenuList(userInfo.roleId!);
      if (menuList) {
        const oldRoutes = mapMenuToRoutes(cacheUserMenu);
        userMenu.value = mapMenuToTree(menuList.menuList);
        const newRoutes = mapMenuToRoutes(userMenu.value);
        diffRoutes(oldRoutes, newRoutes);
        cache.set("userMenu", userMenu.value)
      }
    }

    if (cache.get("entireMenu")) {
      let entireMenu = cache.get("entireMenu");
      entireMenu.value = entireMenu;
    }
  }

  const loginOut = () => {
    cache.clear();
    router.push("/login");
  }

  const getUserInfo = async () => {
    const result = await getUserEntireInfo();
    result && (userEntireInfo.value = result);
  }

  const editUserInfo = async (userInfo: any) => {
    const result = await updateUserEntireInfo(userInfo.id, userInfo);
    return result;
  }

  return {
    userInfo,
    userMenu,
    userEntireInfo,
    menuEntireInfo,
    accountLogin,
    accountRegis,
    loadLoginCache,
    loginOut,
    getUserInfo,
    editUserInfo
  }
})

export default useUserStore;
