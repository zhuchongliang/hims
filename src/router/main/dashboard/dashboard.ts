export default {
  name: "dashboard",
  path: "/main/dashboard",
  meta: {
    title: "控制台",
  },
  component: () => import("@/views/main/dashboard/Dashboard.vue"),
  children: []
}
