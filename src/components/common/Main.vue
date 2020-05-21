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
import TopBar from './TopBar.vue'

export default {
  name: 'App',
  components:{
    TopBar,
  },
  data () {
      return {
        activeBtn: 1,
        links: [
          {btnName: 'mdi-home-variant-outline', text: '종목정보', route: '/main/home'},
          {btnName: 'mdi-chart-bell-curve-cumulative', text: '지수정보', route: '/main/index'},
          {btnName: 'mdi-file-document-edit', text: '다이어리', route: '/main/diary'},
          {btnName: 'mdi-clipboard-list-outline', text: '다이어리'},
          //{btnName: 'mdi-account', text: '', route: '/myInfo'},
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