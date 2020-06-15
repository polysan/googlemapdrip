import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import "element-ui/lib/theme-chalk/index.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places",
    region: "JP",
    language: "ja",
    installComponents: true
  }
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
