<template>
    <div class="home">
        <v-container>
            <v-text-field label="item code" outlined v-model="item_code"></v-text-field>
            <v-text-field label="start date" outlined v-model="start_date"></v-text-field>
            <v-text-field label="last date" outlined></v-text-field>
            <v-btn small @click=getInfo>result</v-btn>

            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Subject</th>
                    <th class="text-left">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="info in data.datas" :key="info.name">
                    <td>{{ info.subject }}</td>
                    <td>{{ info.value }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>            
            {{ data.datas.sum_frgn_unit_price }}
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default{
    data() {
        return{
            data: {
                datas: []
            },
            item_code: '',
            start_date: '',
        }
    },
    methods: {
        getInfo(){
            const baseUrl = "http://127.0.0.1:5000"
            axios.get(`${baseUrl}/unitPrice`,{
                params: {
                    item_code: this.item_code,
                    start_date: this.start_date,
                }
            })
            .then((result) =>{
                console.log(result.data.result)
                this.data.datas = result.data.result
            })
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

