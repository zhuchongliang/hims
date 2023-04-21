export default {
  name: "reserve",
  path: "/main/storage/reserve",
  meta: {
    title: "药品库存管理",
  },
  component: () => import("@/views/main/storage/reserve/Reserve.vue"),
  children: []
}
