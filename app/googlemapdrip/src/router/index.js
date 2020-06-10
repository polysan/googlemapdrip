import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBwjj6oaXdQVbFU_V8Vq1jEAjKHYKhr2xk",
    libraries: "places",
    region: "JP",
    language: "ja",
    installComponents: true
  }
});

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
