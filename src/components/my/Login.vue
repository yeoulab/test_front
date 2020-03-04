<template>
  <div>
    <div><v-icon @click=goBack>mdi-arrow-left</v-icon></div>
    <br>
    <div class="v-card v-card--raised v-sheet theme--light">
    <!-- <v-card class="mx-auto">     -->
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        > 
          <!-- <v-btn @click=goBack class="ma-2" color="purple darken-2" dark>
              <v-icon purple left>mdi-arrow-left</v-icon>뒤로
            </v-btn> -->
          <!--:rules="emailRules"-->
          <v-text-field
            v-model="email"
            label="E-mail"
            required
          ></v-text-field>
          <!--:rules="[rules.required, rules.min]"-->
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            hint="문자+숫자+특수문자"
            class="input-group--focused"
            @click:append="show = !show"
          ></v-text-field>    
          <br>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login"
          >로그인</v-btn>
          <v-btn
            color="success"
            class="mr-4"
            @click="goToRegister"
          ><v-icon left>mdi-account-plus</v-icon>회원가입</v-btn>        
        </v-form>
      </v-card-text>
    <!-- </v-card> -->
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data: () => ({
      valid: true,
      show: false,
      email: '',
      // emailRules: [
      //   v => /.+@.+\..+/.test(v) || 'E-mail 형식이 맞지 않습니다',
      // ],
      // rules: {
      //     required: value => !!value || 'Required.',
      //     emailMatch: () => ('The email and password you entered don\'t match'),
      //   },
    }),

    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
        return new Promise((resolve, reject) => {
                axios.post('/login'
                , { pwd: this.password
                   ,email: this.email},
                   
                ).then(res => {
                    if(res){
                        // res 자체가 json 객체이므로
                        // 따로 json parser 를 쓸 필요 없다
                        console.log(res.data)
                        console.log(res.headers)
                        this.$store.commit('setCustomer',{
                          id: res.data.uid,
                          name: res.data.name,
                          phone: res.data.phone,
                          email: res.data.email
                        })
                        this.$store.commit({
                          type: 'login'
                        })
                        this.$router.push('/myInfo')
                        resolve(res)
                    }
                    reject(new Error("Login Failed"));
                }).catch(error => {
                  console.log("Login prelighted 에러")
                  alert(error.res.data.message)
                })
            });        
      },
      goBack () {
        this.$router.push("/myInfo")
      },
      goToRegister(){
        this.$router.push("/register")
      }
    },
    created() {
      this.email = this.$store.state.customer.email
    }
  }
</script>
