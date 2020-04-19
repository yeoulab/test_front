<template>
    <div class="home">
        <v-container>
            <v-row style="height: 50px;">
                <v-col xs6 sm4 md3>
                    <v-text-field
                        label="item name"
                        outlined
                        dense
                        v-model="item_name"
                        @change="item_name_change">
                    </v-text-field>
                </v-col>
                <v-col xs6 sm4 md3>
                    <v-text-field 
                        label="item code" 
                        outlined 
                        dense
                        v-model="item_code"
                        @change="item_change">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row style="height: 50px;"
            >
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
            <v-row class="mb-1">
                <v-col xs4 sm4 md3>
                    <v-btn small color="success" @click="getInfo">Call Api</v-btn>
                </v-col>
                <v-col xs4 sm4 md3>
                    <v-btn small @click="getCompInfo">Company Info</v-btn>
                </v-col>
                <v-col xs4 sm4 md3>
                    <v-btn small @click="insert_diary">Save Diary</v-btn>
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
                <br>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td>총발생주식수</td>
                                <td>{{data.company_detail_info.tot_stock_cnt}}</td>
                                <td>유통주식수</td>
                                <td>{{data.company_detail_info.cir_stock_cnt}}</td>
                            </tr>
                            <tr>
                                <td>유통비율</td>
                                <td>{{data.company_detail_info.cir_stock_ratio}}%</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>총거래량</td>
                                <td>{{data.max_info.tot_tr_quant}}</td>
                                <td>최대거래량</td>
                                <td>{{data.max_info.max_tr_quant}}</td>
                            </tr>
                            <tr>
                                <td>거래일자</td>
                                <td>{{data.max_info.max_tr_date}}</td>
                                <td>최대거래비율</td>
                                <td>{{data.max_info.max_tr_ratio}}%</td>
                            </tr>
                            <tr>
                                <td colspan="2">총거래량 / 유통주식수</td>
                                <td colspan="2">{{ data.max_info.tot_cir_ratio }}%</td>
                            </tr>
                            <tr>
                                <td colspan="2">최대거래량 / 유통주식수</td>
                                <td colspan="2">{{ data.max_info.max_cir_ratio }}%</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <br>
                <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">주제</th>
                            <th class="text-center">현재값</th>
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
                max_info: {},
                company_detail_info: {},
            },
        }
    },
    methods: {
        getInfo(){
            axios.get('/unitPrice',{
                params: {
                    item_code: this.item_code,
                    start_date: this.start_date,
                    end_date: this.end_date,
                }
            })
            .then((result) =>{
                console.log(result.data)
                this.search_yn = true
                this.data.pre_datas = this.data.datas
                this.data.max_info = result.data.max_info
                this.data.company_detail_info = result.data.company_detail_info
                console.log("$$$ : " + this.data.max_info)
                console.log("max_tr_quant : " + this.data.max_info.max_tr_quant)
                console.log("%%% : " + this.data.company_detail_info)
                

                this.data.datas = result.data.result
                for( var i = 0 ; i < this.data.datas.length ; i++ ){
                    this.data.datas[i].pre_value = this.data.pre_datas[i].value
                }
            })
        },
        getCompInfo(){
            window.open(this.link ,"");
        },
        insert_diary(){
            var params = {}
            params.jongmok_code = this.item_code
            params.start_date = this.start_date
            params.company_name = this.item_name
            params.buy_reasone = "개인매수단가 : " + this.data.datas[5].value
            console.log(params)
            axios.post('/insert/diary', params)
            .then(res => {
                console.log(res)
            })
        },
        item_name_change(){
            axios.get('/code',{
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
                axios.get('/codeInfo',{
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
                        }),
        console.log(this.$store.state.stockInfo)
        this.item_code = this.$store.state.stockInfo.item_code
        this.item_name = this.$store.state.stockInfo.item_name
        this.start_date = this.$store.state.stockInfo.start_date

        if( this.item_code != "" ){
            this.getInfo()
        }                                
    }
}
</script>
<style>
</style>