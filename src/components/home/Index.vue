<template>
    <div class="home">
        <v-btn small @click="getGlobalIndex">Get Global Index</v-btn>
        <v-container>
            <v-simple-table dense>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Name</th>
                        <th class="text-center">Index</th>
                        <th class="text-center">High</th>
                        <th class="text-center">Low</th>
                        <th class="text-center">High Ratio</th>
                        <th class="text-center">Low Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in datas" :key="data.index_nm">
                        <td class="text-center">{{ data.index_nm }}</td>
                        <td class="text-right">{{ data.float_index }}</td>
                        <td class="text-right">{{ data.float_highest_index }}</td>
                        <td class="text-right">{{ data.float_lowest_index }}</td>
                        <td class="text-right">{{ data.float_ratio_highest }}</td>
                        <td class="text-right">{{ data.float_ratio_lowest }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>        
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            baseUrl:  "http://34.64.244.176:8090",
            //baseUrl:  "http://127.0.0.1:8090",
            datas: [],
        }
    },
    methods:{
        getGlobalIndex(){
            axios.get(`${this.baseUrl}/globalIndex`)
            .then((res) =>{
                console.log(res.data)
                
                this.datas = res.data
            })
        }
    }

}
</script>