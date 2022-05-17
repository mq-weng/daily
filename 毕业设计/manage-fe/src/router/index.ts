import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/person/index.vue"),
    children: [
      {
        path: "",
        name: "Diray",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/person/diray/index.vue"
          ),
      },
      {
        path: "schedule",
        name: "Schedule",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/person/schedule/index.vue"
          ),
      },
      {
        path: "study",
        name: "Study",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/person/study/index.vue"
          ),
      },
      {
        path: "detaile",
        name: "Detaile",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/person/study/detaile.vue"
          ),
        // children: [
        //   {
        //     path: "edit",
        //     name: "Edit",
        //     component: () =>
        //       import(
        //         /* webpackChunkName: "about" */ "../views/person/study/edit.vue"
        //       ),
        //   },
        // ],
      },
      {
        path: "account",
        name: "Account",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/person/account/index.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/register/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
