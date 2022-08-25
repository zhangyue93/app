<template>
	<v-list
	  nav
	  dense
	>
					
		<v-list-item to="/top">
			<v-list-item-icon>
				<v-icon>mdi-home</v-icon>
			</v-list-item-icon>
			<v-list-item-title>Home</v-list-item-title>
		</v-list-item>
					
					
	  <v-list-group
	    
	    active-class="deep-purple--text text--accent-4"
					  prepend-icon="mdi-account-circle"
	  >
					
					<template v-slot:activator>
					  <v-list-item-title>Users</v-list-item-title>
					</template>
					
	    <v-list-item to="/infor">
	      <v-list-item-icon>
	        <v-icon>mdi-account-multiple-outline</v-icon>
	      </v-list-item-icon>
	      <v-list-item-title>Manage</v-list-item-title>
	    </v-list-item>
			
	    <v-list-item to="/acc">
	      <v-list-item-icon>
	        <v-icon>mdi-file-outline</v-icon>
	      </v-list-item-icon>
	      <v-list-item-title>Account</v-list-item-title>
	    </v-list-item>
					  
	  </v-list-group>
	</v-list>
	
</template>

<script>
	
</script>