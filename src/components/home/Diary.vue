<template>
    <v-container>
        <!--
        <v-btn icon small @click="get_diary">
            <v-icon>mdi-owl</v-icon>
        </v-btn>
        -->
        <v-dialog width="500" v-for="data in datas" v-bind:key=data.jongmok_code>
            <template v-slot:activator="{ on }">
                <v-card v-on="on">
                    <v-card-text>
                        {{ data.company_name }}({{ data.jongmok_code }}) from {{ data.start_date }}
                    </v-card-text>
                </v-card>
            </template>
            <v-card>
                <v-card-text>
                <v-container grid-list-xs>
                    <v-layout wrap>
                        <v-flex xs4 sm4 md3>
                            <v-text-field readonly :value=data.company_name></v-text-field>
                        </v-flex>
                        <v-flex xs4 sm4 md3>
                            <v-text-field readonly :value=data.jongmok_code></v-text-field>
                        </v-flex>
                        <v-flex xs4 sm4 md3>
                            <v-text-field readonly :value=data.start_date></v-text-field>
                        </v-flex>
                        <v-flex xs12 style="height: 105px">
                            <v-textarea label="매수이유" outlined rows="3" row-height="24"
                                    :value=data.buy_reason v-model=data.buy_reason>
                            </v-textarea>
                        </v-flex>
                        <v-flex xs12 style="height: 105px">
                            <v-textarea label="매도시점" outlined rows="3" row-height="24"
                                    :value=data.sell_reason v-model=data.sell_reason>
                            </v-textarea>
                        </v-flex>
                        <v-flex xs12 style="height: 105px">
                            <v-textarea label="성공요인" outlined rows="3" row-height="24"
                                    :value=data.suc_reason v-model=data.suc_reason>
                            </v-textarea>
                        </v-flex>
                        <v-flex xs12 style="height: 105px">
                            <v-textarea label="실패이유" outlined rows="3" row-height="24"
                                    :value=data.fail_reason v-model=data.fail_reason>
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" 
                    @click="go_to_first(data)">첫화면</v-btn>
                <v-btn color="blue darken-1" 
                    @click="update_diary(data)">Save</v-btn>
                </v-card-actions>
            </v-card>                     
        </v-dialog>
    </v-container>
</template>
<script>
    import axios from 'axios'

    export default{
        data() {
            return {
                datas: [],
                dialog: false
            }
        },
        methods: {
            get_diary(){
                axios.get('/search/diary')
                .then((result) =>{
                    console.log(result)
                    this.datas = result.data
                })
            },
            update_diary(data){
                axios.post('/update/diary', data,                    
                    ).then(res => {
                        if(res){
                            console.log(res)
                        }
                    })
            },
            
            go_to_first(data){
                this.$store.commit('setStockInfo',{
                    item_code: data.jongmok_code,
                    item_name: data.company_name,
                    start_date: data.start_date,
                })            
                this.$router.push("/main/home");    
            }
        },
        mounted() {
            this.$store.commit('setPageName',{
                            pageName: '드아이어리'
                            })
            this.get_diary()    
        }
    }
</script>
<style>
ul{
   list-style:none;
   }
</style>