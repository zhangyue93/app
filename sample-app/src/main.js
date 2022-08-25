import Vue from 'vue'   //引入vue模块
import App from './App'  //引入vue组件
import router from './router' 
import store from "./store"
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  vuetify,
  template: "<App/>"
});
