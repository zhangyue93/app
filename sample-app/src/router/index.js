import Vue from 'vue' // 导入Vue
import Router from 'vue-router' // 导入vue-router 库
import Layouts from '@/components/Layouts' // 导入layouts.vue 组件
import Infor from '@/components/Infor'
import Top from '@/components/Top'

import Acc from '@/components/Acc'
import Cus from '@/components/Dependency'


Vue.use(Router) //全局注册Router组件，它会绑定到Vue实例里面。


export default new Router({ // 创建 router 实例，然后传 `routes` 配置
  routes: [
    {
      path: '/',  //访问路径
      name: 'Layouts', // 路径名
      component: Layouts ,//访问的组件,即访问‘/’,它会加载 Layouts 组件所有的内容。
	  children:[
		  {path: '/infor',name: 'Infor',component: Infor},
		  {path: '/top',name: 'Top',component:Top},
		  {path: '/acc',name: 'Acc',component: Acc},
		  
		  {path: '/cus',name: 'Cus',component: Cus}
	  ]
    }
  ]
})