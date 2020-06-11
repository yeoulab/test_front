<template>
    <v-container>
        <v-row style="height: 50px;">
            <v-col xs6 sm4 md3>
                <v-text-field
                    label="item name"
                    outlined
                    dense
                    v-model="item_name"
                    v-on:keyup.enter="item_name_change">
                </v-text-field>
            </v-col>
            <v-col xs6 sm4 md3>
                <v-text-field 
                    label="item code" 
                    outlined 
                    dense
                    v-model="item_code"
                    v-on:keyup.enter="item_change">
                </v-text-field>
            </v-col>
            <v-col>
                <v-text-field 
                    label="배치 일자" 
                    outlined 
                    dense
                    v-model="tr_date">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row style="height: 50px;">
            <v-col>
                <v-text-field 
                    label="일 최대 거래 비율" 
                    outlined 
                    dense
                    v-model="max_cir_ratio">
                </v-text-field>
            </v-col>
            <v-col>
                <v-text-field 
                    label="구간 거래 비율" 
                    outlined 
                    dense
                    v-model="tot_cir_ratio">
                </v-text-field>
            </v-col>
            <v-col>
                <v-btn color="success" @click="get_statistic">조회하믄?</v-btn>
            </v-col>
        </v-row>
        <br>
        <v-simple-table dense>
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">go</th>
                    <th class="text-center">회사</th>
                    <th class="text-center">코드</th>
                    <th class="text-center">시작일</th>
                    <th class="text-center">개인물량</th>
                    <th class="text-center">평단</th>
                    <th class="text-center">종가</th>
                    <th class="text-center">일거래비율</th>
                    <th class="text-center">구간거래비율</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="info in stats_result" :key="info.jongmok_code">
                    <td><v-btn small @click="go_to_first(info)"><v-icon>mdi-owl</v-icon></v-btn></td>
                    <td>{{ info.company_name }}</td>
                    <td>{{ info.jongmok_code }}</td>
                    <td>{{ info.start_date }}</td>
                    <td>{{ info.ind_tr_cnt }}</td>
                    <td>{{ info.ind_avg_avg_amt }}</td>
                    <td>{{ info.fin_amt }}</td>
                    <td>{{ info.max_cir_ratio }}</td>
                    <td>{{ info.tot_cir_ratio }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>         
    </v-container>    
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return{
            item_name: '', 
            item_code: '',
            tr_date: '',
            max_cir_ratio: 0,
            tot_cir_ratio: 0,
            stats_result: []
        }
    },
    methods:{
        get_statistic(){
            if( this.tr_date == "" ){
                alert("배치일자는 입력합시다")
                return
            }
            axios.get('/stats',{
                params: {
                    item: this.item_code,
                    tr_date: this.tr_date,
                    max_cir_ratio: this.max_cir_ratio,
                    tot_cir_ratio: this.tot_cir_ratio
                }
            })
            .then((result => {
                console.log(result.data)
                this.$store.commit('setStatResult',{
                          stats_result: result.data
                        }),
                this.stats_result = result.data
            }))
        },
        item_name_change(){
            axios.get('/item/code',{
                params: {
                    item_name: this.item_name,
                }
            })
            .then((result) =>{
                console.log(result)
                this.item_code = result.data
                if( this.item_code != "" ){
                    this.item_change()
                }
            })
        },
        item_change(){
            if( this.item_code.length == 6 ){
                // item 정보 조회하는 api 호출
                axios.get('/item/info',{
                    params: {
                        item_code: this.item_code,
                    }
                })
                .then((result) =>{
                    this.item_name = result.data[0].value
                })
            }
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
                          pageName: '통계'
                        })
        // vuex 에 있는 조회결과값을 가져온다.
        this.stats_result = this.$store.state.stats_result
    }
}
</script>