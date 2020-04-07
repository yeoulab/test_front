<template>
    <div class="home">
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field
                        label="item name"
                        outlined
                        dense
                        v-model="item_name"
                        @change="item_name_change">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                        label="item code" 
                        outlined 
                        dense
                        v-model="item_code"
                        @change="item_change">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field 
                        label="start date" 
                        outlined 
                        dense
                        v-model="start_date">
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-text-field 
                        label="last date" 
                        outlined 
                        dense
                        v-model="end_date">
                    </v-text-field>
                </v-col>
            </v-row>            
            <v-row class="mb-4">
                <v-col>
                    <v-btn large @click=getInfo>Result from api</v-btn>
                </v-col>
                <v-col>
                    <v-btn large @click=getCompInfo>Company Info</v-btn>
                </v-col>
            </v-row>
            <div v-if="code_search_yn">
                <!--
                <v-data-table
                    dense
                    :headers="headers"
                    :items="code_info"
                    hide-default-footer
                    item-key="subject">
                </v-data-table>
                -->
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Subject</th>
                                <th class="text-center">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in code_info" :key="item.subject">
                            <td>{{ item.subject }}</td>
                            <td>{{ item.value }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </div>            
            <br>
            <div v-if="search_yn">
                <!--
                <v-data-table
                    dense
                    :headers="headers2"
                    :items="data.datas"
                    hide-default-footer
                    item-key="subject">
                </v-data-table> -->
                <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Subject</th>
                            <th class="text-center">Value</th>
                            <th class="text-center">직전값</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="info in data.datas" :key="info.name">
                            <td class="text-center">{{ info.subject }}</td>
                            <td class="text-right">{{ info.value }}</td>
                            <td class="text-right">{{ info.pre_value }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default{
    data() {
        return{           
            item_name: '', 
            item_code: '',
            start_date: '',
            end_date: '',
            baseUrl:  "http://34.64.244.176:8090",
            //baseUrl:  "http://127.0.0.1:8090",
            baseLink: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=',
            link: '',
            headers: [
                { text: 'Subject', value: 'subject'},
                { text: 'Value', value: 'value'}
            ],
            code_search_yn: false,
            code_info: [],
            headers2: [
                { text: 'Subject', value: 'subject'},
                { text: 'Value', value: 'value'},
                { text: 'preValue', value: 'pre_value' }
            ],
            search_yn: false,
            data: {
                datas: [],
                pre_datas: [],
            },
        }
    },
    methods: {
        getInfo(){
            axios.get(`${this.baseUrl}/unitPrice`,{
                params: {
                    item_code: this.item_code,
                    start_date: this.start_date,
                    end_date: this.end_date,
                }
            })
            .then((result) =>{
                console.log(result.data.result)
                this.search_yn = true
                this.data.pre_datas = this.data.datas
                

                this.data.datas = result.data.result
                console.log("@@@ : " + this.data.datas.length)
                for( var i = 0 ; i < this.data.datas.length ; i++ ){
                    this.data.datas[i].pre_value = this.data.pre_datas[i].value
                }

                console.log(this.data.datas[0])                

            })
        },
        getCompInfo(){
            window.open(this.link ,"");
        },
        item_name_change(){
            axios.get(`${this.baseUrl}/code`,{
                params: {
                    item_name: this.item_name,
                }
            })
            .then((result) =>{
                console.log(result)
                this.item_code = result.data
            })
        },
        item_change(){
            if( this.item_code.length == 6 ){
                // item 정보 조회하는 api 호출
                axios.get(`${this.baseUrl}/codeInfo`,{
                    params: {
                        item_code: this.item_code,
                    }
                })
                .then((result) =>{
                    console.log(result)
                    this.code_info = result.data
                    this.code_search_yn = true
                    this.link = this.baseLink + this.item_code
                })
            }
            else{
                this.link = this.baseLink
                this.code_search_yn = false
                this.search_yn = false
                this.data.datas = []
                this.code_info = []
            }
        }
    },
    mounted() {
        this.$store.commit('setPageName',{
                          pageName: '홈'
                        })
      console.log(this.$vuetify.breakpoint)
    }
}
</script>
<style>
.v-card{
    padding-top: 10px;
    padding-bottom: 10px;
}
.v-icon{
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>


