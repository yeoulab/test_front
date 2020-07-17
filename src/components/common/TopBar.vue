<template>
    <nav>
        <v-app-bar flat app dense color="gray"><!--class="grey lighten-5" >-->
            <v-toolbar-title class="font-weight-bold black--text ml-2">{{ this.$store.state.pageName }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field 
                v-if="searchOn == true && this.$store.state.pageName == '지도'"
                dense
                flat
                light
                autofocus
                class="mt-5 black--text"
                v-model="searchInput"
                @keyup.enter="getSearch"
                >
            </v-text-field>
            <v-spacer v-else></v-spacer>
            
            <div class="search" v-if="this.$store.state.pageName == '지도'">
                <v-btn @click="callSearch" icon small>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon v-if="searchOn == true" @click="changeSearchOn" small>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </v-app-bar>
    </nav>
</template>
<script>
import axios from 'axios'

export default {
    name: 'TopBar',
    data() {
        return{
            searchOn: false,
            searchInput: null,
        }
    },
    methods: {
        changeSearchOn() {
            this.searchOn = !this.searchOn
        },
        callSearch(){
            if( this.searchOn ){
                // api 호출
                return new Promise((resolve, reject) => {
                    axios.get('https://openapi.naver.com/v1/search/local.json',
                    {
                        params:{
                            query: this.searchInput,
                            display: 20,
                        }
                    })
                    .then(res => {
                        if(res){
                            resolve(res)
                        }
                        reject(new Error("검색 결과 없음"))
                    })
                    .catch(error => {
                        console.log("Login prelighted 에러 : " + error)
                    })
                })
            }else{
                this.changeSearchOn()
            }
        },
        getSearch(){
            alert(this.searchInput)
        }
    },
    watch: {
        
    }
}
</script>
