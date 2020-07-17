<template>
    <v-container>
        <!--
        <v-btn icon small @click="getGlobalIndex">
            <v-icon>mdi-owl</v-icon>
        </v-btn>
        -->
        <v-card title>
            <v-simple-table dense v-if="this.datas">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Name</th>
                        <th class="text-center">High</th>
                        <th class="text-center">Low</th>
                        <th class="text-center">Index</th>
                        <th class="text-center">High</th>
                        <th class="text-center">Low</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in datas" :key="data.index_nm">
                        <td class="text-center">{{ data.index_nm }}</td>
                        <td class="text-right">{{ data.float_ratio_highest }}</td>
                        <td class="text-right">{{ data.float_ratio_lowest }}</td>
                        <td class="text-right">{{ data.float_index }}</td>
                        <td class="text-right">{{ data.float_highest_index }}</td>
                        <td class="text-right">{{ data.float_lowest_index }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </v-container>        
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            datas: [],
        }
    },
    methods:{
        getGlobalIndex(){
            axios.get('/global/index')
            .then((res) =>{
                console.log(res.data)
                
                this.datas = res.data
            })
        }
    },
    mounted() {
        this.$store.commit('setPageName',{
                          pageName: '인터내쇼날'
                        })
        this.getGlobalIndex()
    }
}
</script>