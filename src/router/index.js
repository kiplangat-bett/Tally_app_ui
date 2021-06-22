import Vue from "vue";
import VueRouter from "vue-router";
import http from "../utils/http-common";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    component: () => import("../views/intro.vue"),
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

    if (state) {
      // if state is true request logout
      window.localStorage.setItem("error", "please logout first");
      return next({ path: "/app" });
    }

    return next();
  }

  if (to.name == "intro") {
    const not_new = window.localStorage.getItem("not_new");
    if (not_new === null) {
      // is new
      window.localStorage.setItem("not_new", true);
      return next();
    }

    if (not_new == true) {
      // why view

      return next({ name: "login" });
    }
  }

  if (state) {
    // do nothing
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
