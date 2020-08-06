<template>
    <div class="theme">
        <v-container fluid grid-list-md>
            <v-row>
                <v-col xs6 sm4 md3>
                    <v-dialog v-model="dialog">
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="success" dense>등록</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>테마 등록</v-card-title>
                            <v-card-text>
                                <v-text-field v-model="theme_name"></v-text-field>
                            </v-card-text>
                            <v-btn color="blue darken-1" style="margin: 0px 20px 20px 20px" v-on:click="insert_theme">
                                등록
                            </v-btn>
                        </v-card>
                    </v-dialog>
                    <v-card class="mx-auto" tile>
                        <v-list dense>
                            <v-subheader>테마</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="data in datas" v-bind:key=data.id>
                                    <v-list-item-content @click="get_items(data.id)">
                                        <v-list-item-title v-text="data.theme_name">
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <!-- <v-list-item-icon> -->
                                        <!-- <v-icon v-on:click="delete_theme(data)">mdi-minus</v-icon> -->
                                        <v-dialog v-model="dialog3" persistent max-width="230">
                                            <template v-slot:activator="{ on }">
                                                <v-icon v-on="on" @click="setTheme(data.id)">mdi-minus</v-icon>
                                                <!--v-on:click="delete_theme(data)"-->
                                            </template>
                                            <v-card>
                                                <v-card-title>확인</v-card-title>
                                                <v-btn color="red text darken-1" @click="delete_theme()">삭제?진짜?</v-btn>
                                                <v-btn color="green text darken-1" @click="dialog3 = false">아니...잠깐</v-btn>
                                            </v-card>
                                        </v-dialog>
                                    <!-- </v-list-item-icon> -->
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col xs6 sm4 md3>
                        <v-dialog v-model="dialog2">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" color="success" dense>등록</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>종목 등록</v-card-title>
                                <v-card-text>
                                    <v-text-field
                                        label="종목명"
                                        outlined
                                        dense
                                        v-model="item_name"
                                        @change="item_name_change">
                                    </v-text-field>
                                    <v-text-field 
                                        label="종목코드" 
                                        outlined 
                                        dense
                                        v-model="item_code"
                                        @change="item_change">
                                    </v-text-field>
                                </v-card-text>
                                <v-btn color="blue darken-1" style="margin: 0px 20px 20px 20px" v-on:click="insert_theme_item()">
                                    등록
                                </v-btn>
                            </v-card>
                        </v-dialog>
                        <v-btn color="blue">계산</v-btn>
                    <v-card class="mx-auto" tile>
                        <v-list dense>
                            <v-subheader>종목</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="item in items" v-bind:key=item.item_code>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.company_name">
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-dialog v-model="dialog4" persistent max-width="230">
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-icon>
                                                <v-icon v-on="on" @click="setItem(item.item_code)">mdi-eraser</v-icon>
                                            </v-list-item-icon>
                                        </template>
                                        <v-card>
                                            <v-card-title>확인</v-card-title>
                                            <v-btn color="red text darken-1" @click="delete_theme_item()">삭제?진짜?</v-btn>
                                            <v-btn color="green text darken-1" @click="dialog4 = false">아니...잠깐</v-btn>
                                        </v-card>
                                    </v-dialog>
                                    
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
            <v-data-iterator
                :items="theme_items"
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
                <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
                    <v-card>
                    <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-item v-for="(key, index) in keys" :key="index">
                        <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
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
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            datas: [],
            theme_name: '',
            item_name: '',
            item_code: '',
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            items: [],
            theme_id: '',
            theme_item_code: '',
            // 아래는 테마조회를 위한 변수들
            itemsPerPageArray: [4, 8, 12],
            search: '',
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            sortBy: '',
            keys: [
                'name',
                'date',
                'tot_ratio',
                'max_ratio',
                'ind_cnt',
                'int_price',
                'cur_price',
            ],
            theme_items: [
            {
                name: '남선알미늄',
                date: '2020-02-01',
                tot_ratio: 'aa',
                max_ratio: '24',
                ind_cnt: '4.0',
                int_price: '87',
                cur_price: '80',
            },
            {
                name: '우리들휴브레인',
                date: '2020-02-03',
                tot_ratio: 'bb',
                max_ratio: '74',
                ind_cnt: '2.0',
                int_price: '83',
                cur_price: '81',
            },
            ]
        }
    },
    methods: {
        setTheme(themeIid){
            this.theme_id = themeIid;
        },
        setItem(item_code){
            this.theme_item_code = item_code;
        },
        get_theme(){
            axios.get('/theme')
            .then((result) =>{
                console.log(result)
                this.datas = result.data
            })
        },
        insert_theme(){
            var params = {}
            params.theme_name = this.theme_name
            console.log(params)
            axios.post('/theme', params)
            .then(res => {
                console.log(res)
                this.dialog = false;
                this.get_theme();
            })
        },
        insert_theme_item(){
            if( this.theme_id == "" ){
                alert("테마를 선택하세요")
                return
            } 
            if( this.item_code == "" ){
                alert("종목을 선택하세요")
                return
            } 
            if( this.item_name == "" ){
                alert("종목을 선택하세요")
                return
            }
            var params = {}
            params.theme_id = this.theme_id;
            params.item_code = this.item_code;
            console.log(params)
            axios.post('/themeItem', params)
            .then(res => {
                console.log(res)
                this.dialog2 = false;
                this.get_items(this.theme_id);
                this.item_name = ''
                this.item_code = ''
            })
        },
        update_diary(data){
            axios.put('/diary', data,                    
                ).then(res => {
                    if(res){
                        console.log(res)
                    }
                })
        },
        delete_theme(){
            axios.delete('/theme', {
                params: {
                    id: this.theme_id
                }}
            )
            .then(res => {
                console.log(res)
                this.theme_id = ""
                this.get_theme()
                this.items = []
                this.dialog3 = false
            })
        },
        delete_theme_item(){
            this.dialog4 = false
            axios.delete('/themeItem', {
                params: {
                    theme_id: this.theme_id,
                    item_code : this.theme_item_code
                }}
            )
            .then(res => {
                console.log(res)
                this.theme_item_code = ""
                this.get_items(this.theme_id)
                this.dialog4 = false
            })
        },
        get_items(id){
            this.theme_id = id;
            axios.get('/themeItem', {
                params: {
                    theme_id: id
                }} 
            )
            .then((result) =>{
                this.items = result.data
            })
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
                    console.log(result)
                    this.item_name = result.data[0].value
                })
            }
            else{
                this.item_name = ""
            }
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
        this.get_theme()
        this.$store.commit('setPageName',{
                            pageName: '테마관리'
                        })
        // vuex 에 있는 조회결과값을 가져온다.
        this.stats_result = this.$store.state.stats_result
    },
    computed: {
        numberOfPages () {
            return Math.ceil(this.theme_items.length / this.itemsPerPage)
        },
        filteredKeys () {
            return this.keys.filter(key => key !== `Name`)
        },
    },
}
</script>