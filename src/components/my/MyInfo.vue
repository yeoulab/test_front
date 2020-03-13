<template>
    <div class="myInfo">
        <v-container>
            <div class="col-md-4 col-12" v-if="getLoginFlag==false">
                <div class="v-card v-card--outlined v-sheet theme--light">
                    <a href="#/login" tabindex="0" class="v-list-item--doc v-list-item v-list-item--link theme--light primary--text">
                        <div class="v-avatar v-list-item__avatar indigo darken-1" style="height:40px;min-width:40px;width:40px;">
                            <i aria-hidden="true" class="v-icon mdi mdi-account theme--dark"></i>
                        </div>
                        <div class="v-list-item__content">
                            <div class="v-list-item__title">
                                <span>로그인 해주세요</span>
                            </div>
                        </div><!---->
                        <div class="v-list-item__action">
                            <i aria-hidden="true" class="v-icon notranslate mdi mdi-arrow-right theme--light"></i>
                        </div>
                    </a>
                </div>            
            </div>
            <div @click="logout" class="col-md-4 col-12" v-if="getLoginFlag==true">
                <div class="v-card v-card--outlined v-sheet theme--light">
                    <a href="#/login" tabindex="0" class="v-list-item--doc v-list-item v-list-item--link theme--light primary--text">
                        <div class="v-avatar v-list-item__avatar indigo darken-1" style="height:40px;min-width:40px;width:40px;">
                            <i aria-hidden="true" class="v-icon mdi mdi-account theme--dark"></i>
                        </div>
                        <div class="v-list-item__content">
                            <div class="v-list-item__title">
                                <span>{{ this.$store.state.customer.name }}님 반갑습니다.</span>
                            </div>
                        </div><!---->
                        <div class="v-list-item__action">
                            <i aria-hidden="true" class="v-icon notranslate mdi mdi-arrow-right theme--light"></i>
                        </div>
                    </a>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data: () => ({
      
    }),
    computed:{ 
        getLoginFlag(){
            return this.$store.state.loginFlag
        }
    },
    methods: {
        increment(){
            this.$store.commit('increment', 10)
        },
        changeLogin(){
            this.$store.commit('login')
        },
        logout(){
            return new Promise((resolve, reject) => {
                    axios.post('/logout')
                    .then(res => {
                        if(res){
                            this.$store.commit({
                                type: 'logout'
                            })
                            this.$router.push('/myInfo')
                            resolve(res)
                        }
                        reject(new Error("LogOut Failed"));
                    }).catch(error => {
                        alert(error.response.data.message)
                    })
                });             
        }
    }
}
</script>


