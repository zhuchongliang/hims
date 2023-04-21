export default {
  name: "stock",
  path: "/main/office/stock",
  meta: {
    title: "库存信息管理",
  },
  component: () => import("@/views/main/office/stock/Stock.vue"),
  children: []
}
