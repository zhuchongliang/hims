export default {
  name: "officeInfo",
  path: "/main/office/officeInfo",
  meta: {
    title: "药房信息管理",
  },
  component: () => import("@/views/main/office/office-info/OfficeInfo.vue"),
  children: []
}
