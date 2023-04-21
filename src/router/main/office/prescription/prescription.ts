export default {
  name: "prescription",
  path: "/main/office/prescription",
  meta: {
    title: "门诊药方管理",
  },
  component: () => import("@/views/main/office/prescription/Prescription.vue"),
  children: []
}
