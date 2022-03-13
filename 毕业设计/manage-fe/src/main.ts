import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './style/index'
import { Button, Menu, MenuItem, Submenu, Image, Card, Form, Input, Avatar, FormItem, DatePicker} from "element-ui";
const uiCommponets = [Button, Menu, MenuItem, Submenu, Image, Card, Form, Input, Avatar, FormItem, DatePicker];
Vue.config.productionTip = false;
uiCommponets.forEach((uiCommponet) => {
  Vue.use(uiCommponet);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

