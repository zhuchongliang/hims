export default {
  name: "user",
  path: "/main/system/user",
  meta: {
    title: "用户管理",
  },
  component: () => import("@/views/main/system/user/User.vue"),
  children: []
}
