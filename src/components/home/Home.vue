<template>
    <div class="home">
        <v-container>
            <v-text-field label="item code" outlined v-model="item_code"></v-text-field>
            <v-text-field label="start date" outlined v-model="start_date"></v-text-field>
            <v-text-field label="last date" outlined v-model="end_date"></v-text-field>
            <v-row class="mb-4">
                <v-col>
                    <v-btn small @click=getInfo>result</v-btn>
                </v-col>
                <v-col>
                    <v-btn small @click=getCompInfo>기업정보</v-btn>
                </v-col>
            </v-row>
            <br>
            <div v-if="search_yn">
                <v-simple-table>
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
            data: {
                datas: [],
                pre_datas: [],
            },
            item_code: '',
            start_date: '',
            end_date: '',
            link: 'https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd=',
            search_yn: false,
        }
    },
    methods: {
        getInfo(){
            const baseUrl = "http://127.0.0.1:5000"
            axios.get(`${baseUrl}/unitPrice`,{
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

                this.link = this.link + this.item_code
            })
        },
        getCompInfo(){
            window.open(this.link ,"");
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

