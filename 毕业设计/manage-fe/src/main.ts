import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Menu, MenuItem, Submenu } from "element-ui";
const uiCommponets = [Button, Menu, MenuItem, Submenu];
Vue.config.productionTip = false;
uiCommponets.forEach((uiCommponet) => {
  Vue.use(uiCommponet);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
