export default {
  name: "my",
  path: "/main/my",
  meta: {
    title: "个人中心",
  },
  component: () => import("@/views/main/my/My.vue"),
  children: []
}
