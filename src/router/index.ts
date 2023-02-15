// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        beforeEnter: () => {
          const authStore = useAuthStore();
          if (!authStore.isAuthenticated()) {
            return "/account/login";
          }
          return true;
        },
      },
      {
        path: "/account/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        beforeEnter: () => {
          const authStore = useAuthStore();
          if (authStore.isAuthenticated()) {
            return "";
          }
          return true;
        },
      },
      // redirect to home for 404
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        beforeEnter: () => "",
        component: import("@/views/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
