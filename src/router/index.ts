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
    name: "login"
  },
  {
    path: "/regis",
    component: () => import("@/views/regis/Regis.vue"),
    name: "regis"
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/not-found/NotFound.vue"),
    name: "notFound"
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((from) => {
  const token = cache.get("token");
  if (!token && from.path !== "/login" && from.path !== "/regis") {
    return "/login"
  }
})

export default router
