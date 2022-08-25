<template>
	<v-app>
		<v-main>
		<!-- 背景-->
		 <v-card
		    class="mx-auto overflow-hidden"
		    height="1000px"
		  >
		  <!-- 头部条-->
		    <v-app-bar
		      color="indigo"
		      dark
		    >
		      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
		
		      <v-toolbar-title class="font-weight-black">Menu</v-toolbar-title>
		    </v-app-bar>
			
			<!-- 左侧菜单-->
		    <v-navigation-drawer
		      v-model="drawer"
		      absolute
		      temporary
		    >
		      <Menus></Menus>
		    </v-navigation-drawer>
			
			<!-- 右侧显示画面-->
			<v-container>
				<router-view></router-view>
			</v-container>
			
		  </v-card>
		  
		  <!-- 页脚-->
			<v-footer 
			color="indigo lighten-1"
			dark>
				<v-col
				class="text-center"
				cols="12"
				
				>
					{{ new Date().getFullYear() }} — <strong>Vuetify</strong> — {{'version:' + version}}
				</v-col>
			</v-footer>
	</v-main>
	</v-app>
</template>

<script>
	
	import Menus from './Menus';
	import Infor from './Infor';
	import config from '../../package.json';
	
	
	export  default {
		components:{
			Menus,
			Infor
		},
		data: () => ({
		      drawer: false,
		      group: null,
			  version: config.version
		    }),
			
		methods: {
		    loginSystem () {
		      console.log(this.version)
		  }
		  },

		
		
	};
	
	
	
</script>

<style>

</style>