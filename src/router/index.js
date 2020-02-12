import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/register/index.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin/index.vue"),
    meta: {
      needLogin: true
    },
    children: [
      {
        path: "user/home",
        name: "userhome",
        component: () => import("../views/admin/userhome.vue"),
        meta: {
          needLogin: true
        }
      }
    ]
  },
  {
    path: "/classification",
    name: "classification",
    component: () => import("../views/classification/index.vue")
  },
  {
    path: "/creating",
    name: "creating",
    component: () => import("../views/creating/index.vue"),
    meta: {
      needLogin: true
    }
  },
  {
    path: "/mystudy",
    name: "mystudy",
    component: () => import("../views/mystudy/index.vue"),
    meta: {
      needLogin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
