import Vue from "vue";
import VueRouter from "vue-router";
import http from "../utils/http-common";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    component: () => import("../views/intro.vue"),
    // beforeEnter: (to, from, next) => {
    //   const new_user = window.localStorage.getItem("new_user");
    //   console.log(new_user);

    //   if (new_user === null) {
    //     console.log("new_user");

    //     window.localStorage.setItem("new_user", false);
    //     return next();
    //   }
    //   if (!new_user){
    //    return next({ name: "login"})

    //   }
    //   if(from.path === "/"){
    //     console.log("here")

    //    return next()
    //   }
    // },
  },
  {
    path: "/app",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/main.vue"),
      },
      {
        path: "village/:id",
        props: true,
        component: () => import("../views/village.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../views/settings.vue"),
      },
      {
        path: "generate-nth/:villageId",
        props: true,
        name: "generate-nth",
        component: () => import("../views/finale.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

const verifyToken = async function () {
  const token = window.localStorage.getItem("token");

  if (token === null) {
    return false;
  }

  const res = await http.get("/verifyToken", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data.success;
};

router.beforeEach(async function (to, from, next) {
  const state = await verifyToken();

  console.log(state);
  if (to.name == "login" || to.name == "register") {
    console.log("inside login");

    return next();
  }

  if (state) {
    // do nothing
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
