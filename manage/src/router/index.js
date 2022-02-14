import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Dairy",
    component: () =>
      import(/* webpackChunkName: "dairy" */ "../views/dairy/index.vue"),
  },
  {
    path: "/study",
    name: "Study",
    component: () =>
      import(/* webpackChunkName: "study" */ "../views/study/index.vue"),
  },
];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
