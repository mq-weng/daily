import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./utils/http"
import './style/index'
import { Button, Menu, MenuItem, Submenu, Image, Card, Form, Input, Avatar, FormItem, DatePicker,Select,Option,Table,TableColumn,Message,Checkbox,Tag,Icon,Dialog,Radio,Popover} from "element-ui";
const uiCommponets = [Button, Menu, MenuItem, Submenu, Image, Card, Form, Input, Avatar, FormItem, DatePicker,Select,Option,Table,TableColumn,Checkbox,Checkbox,Tag,Icon,Dialog,Radio,Popover];
Vue.config.productionTip = false;
uiCommponets.forEach((uiCommponet) => {
  Vue.use(uiCommponet);
});
Vue.prototype.$axios = http;
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

