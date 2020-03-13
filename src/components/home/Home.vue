<template>
    <div class="home">
        <v-container>
            <v-card>
                <v-row align="center" justify="space-around" v-for="a in items" v-bind:key="a.id">
                    <v-icon large color="indigo darken-2" @click="movePage(a.btnName[0])">{{ a.btnName[0] }}</v-icon>
                    <v-icon large color="indigo darken-2" @click="movePage(a.id)">{{ a.btnName[1] }}</v-icon>
                    <v-icon large color="indigo darken-2" @click="movePage(a.id)">{{ a.btnName[2] }}</v-icon>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default{
    data() {
        return{
            items: [
                {row:'1', btnName: ['mdi-domain', 'mdi-message-text', 'mdi-dialpad']},
                {row:'2', btnName: ['mdi-domain', 'mdi-message-text', 'mdi-dialpad']},
                {row:'3', btnName: ['mdi-domain', 'mdi-message-text', 'mdi-dialpad']},
                {row:'4', btnName: ['mdi-domain', 'mdi-message-text', 'mdi-dialpad']},
            ]
        }
    },
    methods: {
        movePage(a){
            alert("a : " + a)
            // 버튼명에 따른 분기처리
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


