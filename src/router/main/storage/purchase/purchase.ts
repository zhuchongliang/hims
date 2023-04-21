export default {
  name: "purchase",
  path: "/main/storage/purchase",
  meta: {
    title: "采购计划管理",
  },
  component: () => import("@/views/main/storage/purchase/Purchase.vue"),
  children: []
}
