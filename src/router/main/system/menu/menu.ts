export default {
  name: "menu",
  path: "/main/system/menu",
  meta: {
    title: "菜单管理",
  },
  component: () => import("@/views/main/system/menu/Menu.vue"),
  children: []
}
