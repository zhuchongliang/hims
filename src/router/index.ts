import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import cache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main/dashboard"
  },
  {
    path: "/main",
    component: () => import("@/views/main/Main.vue"),
    children: [],
    name: "main"
  },
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    name: "login",
    meta: {
      title: "登录页面",
    },
  },
  {
    path: "/regis",
    component: () => import("@/views/regis/Regis.vue"),
    name: "regis",
    meta: {
      title: "注册页面",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue"),
    meta: {
      title: "404NotFound",
    },
    name: "notFound"
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from) => {
  const token = cache.get("token");
  if (!token && to.path !== "/login" && to.path !== "/regis") {
    return "/login"
  }
  document.title = to.meta.title as string;
})

export default router
