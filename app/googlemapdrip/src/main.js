import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import "element-ui/lib/theme-chalk/index.css";
import * as VueGoogleMaps from "vue2-google-maps";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBwjj6oaXdQVbFU_V8Vq1jEAjKHYKhr2xk",
    libraries: "places",
    region: "JP",
    language: "ja",
    installComponents: true
  }
});
Vue.prototype.$axios = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
