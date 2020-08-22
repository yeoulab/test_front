<template>
    <v-container>
        <div>
            <v-text-field label="회사명" outlined dense hide-details="auto"></v-text-field>
            <v-text-field label="종목코드" outlined dense hide-details="auto"></v-text-field>
            <v-text-field label="업종" outlined dense hide-details="auto"></v-text-field>
            <v-text-field label="메인상품" outlined dense ></v-text-field>
            <v-btn>조회</v-btn>
        </div>
    </v-container>
</template>
<script>
//import axios from 'axios'
export default {
    data() {
        return{
            company_list: [],
        }
    }
}
</script>