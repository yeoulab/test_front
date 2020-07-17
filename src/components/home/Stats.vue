<template>
    <v-container>
        <v-row style="height: 50px;">
            <!-- <v-col xs6 sm4 md3>
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
            </v-col> -->
            <v-col>
                <v-text-field 
                    label="배치 일자" 
                    outlined 
                    dense
                    v-model="tr_date">
                </v-text-field>
            </v-col>
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
                <v-btn color="success" @click="get_statistic">조회</v-btn>
            </v-col>
        </v-row>
        <!--
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
        -->
        <br>
        <v-data-iterator
                :items="stats_result"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :search="search"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
                hide-default-footer
            >
            <template v-slot:header>
                <v-toolbar dark color="blue darken-3" class="mb-1">
                <v-text-field
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    label="검색"
                ></v-text-field>
                <!-- <template v-if="$vuetify.breakpoint.mdAndUp"> -->
                <v-spacer></v-spacer>
                <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="정렬"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn large depressed color="blue" :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn large depressed color="blue" :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                </v-btn-toggle>
                <!-- </template> -->
                </v-toolbar>
            </template>
            <template v-slot:default="props">
                <v-row>
                <v-col v-for="item in props.items" :key="item.jongmok_code" cols="12" sm="6" md="4" lg="3">
                    <v-card>
                    <v-card-title class="subheading font-weight-bold">
                        {{ item.company_name }}
                        <v-btn class="mx-2" fab dark small @click="go_to_first(item)">
                            <v-icon>mdi-calculator-variant</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-item v-for="(key, index) in keys" :key="index">
                        <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}</v-list-item-content>
                        <v-list-item-content class="align-end flex-column" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                        </v-list-item>
                    </v-list>
                    </v-card>
                </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <v-row class="mt-2" align="center" justify="center">
                    <span class="grey--text">Items per page</span>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                            {{ itemsPerPage }}
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                        </template>
                        <v-list>
                        <v-list-item
                            v-for="(number, index) in itemsPerPageArray"
                            :key="index"
                            @click="updateItemsPerPage(number)"
                        >
                            <v-list-item-title>{{ number }}</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <span class="mr-4 grey--text">
                        Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <v-btn fab dark small color="blue darken-3" class="mr-1" @click="formerPage">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="blue darken-3" class="ml-1" @click="nextPage">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </template>
        </v-data-iterator>
        <!--
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
        -->
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
            // 아래는 테마조회를 위한 변수들
            itemsPerPageArray: [10, 20, 30],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 10,
            sortBy: '',
            keys: [
                'company_name',
                'jongmok_code',
                'start_date',
                'ind_tr_cnt',
                'ind_avg_avg_amt',
                'fin_amt',
                'max_cir_ratio',
                'tot_cir_ratio',
            ],            
            stats_result: [],
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
        },
        // data iterator 를 위한 메소드
        nextPage () {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage () {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateItemsPerPage (number) {
            this.itemsPerPage = number
        },
    },
    mounted() {
        this.$store.commit('setPageName',{
                          pageName: '통계'
                        })
        // vuex 에 있는 조회결과값을 가져온다.
        this.stats_result = this.$store.state.stats_result
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.stats_result.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== `Name`)
        },
    },    
}
</script>