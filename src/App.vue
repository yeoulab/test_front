<template>
  <v-app>
    <TopBar></TopBar>
    <v-content class="mx-1">
      <router-view></router-view>
    </v-content>    
    <v-footer app>      
      <v-bottom-navigation app grow
        :value="activeBtn"
        color="indigo darken-2"
      >
        <v-btn
          v-for="link in links"
          :key="link.btnName"
          router :to="link.route">
          <v-icon>{{ link.btnName }}</v-icon>
        </v-btn>
      </v-bottom-navigation>      
    </v-footer>
  </v-app>
</template>

<script>
import TopBar from './components/common/TopBar.vue'

export default {
  name: 'App',
  components:{
    TopBar,
  },
  data () {
      return {
        activeBtn: 1,
        links: [
          {btnName: 'mdi-map-marker', text: '', route: '/map'},
          {btnName: 'mdi-home-variant-outline', text: '', route: '/home'},
          {btnName: 'mdi-file-document-edit', text: '', route: '/contract'},
          {btnName: 'mdi-account', text: '', route: '/myInfo'},
        ]
      }
  },
};
</script>
<style>
v-content{
  padding-top: 50px
}
</style>


