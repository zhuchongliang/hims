export default {
  name: "role",
  path: "/main/system/role",
  meta: {
    title: "角色管理",
  },
  component: () => import("@/views/main/system/role/Role.vue"),
  children: []
}
