export default [
  {
    path: "/",
    name: "layout",
    component: () => import("@/view/layout/index.vue"),
    children: [
      {
        path: "",
        name: "main",
        component: () => import("@/view/main/index.vue"),
      },
    ],
  },
];
