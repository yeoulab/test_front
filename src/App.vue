<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>  
    <v-footer app>
      <v-bottom-navigation app grow
        :value="activeBtn"
        color="deep-purple accent-4"
      >
        <v-btn  @click="goToHome">
          <v-icon>mdi-home-variant-outline</v-icon>
        </v-btn>

        <v-btn  @click="goToContract">
          <v-icon>mdi-file-document-edit</v-icon>
        </v-btn>

        <v-btn @click="goToMap">
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>

        <v-btn @click="goToAd">
          <v-icon>mdi-television-classic</v-icon>
        </v-btn>

        <v-btn  @click="goToAccount">
          <v-icon>mdi-account</v-icon>
        </v-btn>        
      </v-bottom-navigation>      
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
      return {
        activeBtn: 1, 
      }
  },
  methods: {
    /*
        {path: '/', component: Home},
        {path: '/home', component: Home},
        {path: '/map', component: Map},
        {path: '/contract', component: Contract},
        {path: '/advertisement', component: AdPanel},
        {path: '/my', component: Login},
    */
    goToHome(){
      this.$router.push("/home");
    },
    goToContract(){
      this.$router.push("/contract");
    },
    goToMap(){
      this.$router.push("/Map");
    },
    goToAd(){
      this.$router.push("/advertisement");
    },
    goToAccount(){
      this.$router.push("/Login");
    },
  }
};
</script>
