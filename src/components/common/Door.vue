<template>
    <div class="wrap-first">
        <div class="layer">
            <v-dialog width="500">
                <template v-slot:activator="{ on }">
                    <v-btn 
                        x-large icon color="purple darken-2" 
                        @click="enterMain1"
                        v-on="on">
                        <v-icon>mdi-cat</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">야웅이</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required v-model="pwd"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="enterMain1">Go</v-btn>
                    </v-card-actions>
                </v-card>                        
            </v-dialog>
            <v-dialog width="500">
                <template v-slot:activator="{ on }">
                    <v-btn 
                        x-large icon color="purple darken-2" 
                        @click="enterMain2"
                        v-on="on">
                        <v-icon>mdi-dog</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">멍뭉이</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required v-model="pwd"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="enterMain2">Go</v-btn>
                    </v-card-actions>
                </v-card>                        
            </v-dialog>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                pwd: '',
            }
        },
        methods: {
            enterMain1(){
                if( this.pwd == "0101" ){
                    this.$router.push("/main/home");
                }
            },
            enterMain2(){
                if( this.pwd == "0410" ){
                    this.$router.push("/main/home");
                }
            }
        }
    }
</script>
<style scoped>
.wrap-first{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
