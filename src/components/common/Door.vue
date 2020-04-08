<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                    label="item name"
                    outlined
                    dense
                    v-model="pwd">
                </v-text-field>
            </v-col>
            <v-col>
                <v-btn @click="enterMain">입장</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default{
        data() {
            return {
                pwd: '',
            }
        },
        methods: {
            enterMain(){
                if( this.pwd == "0109" ){
                    this.$router.push("/main/home");
                }
            }
        }

    }
</script>
