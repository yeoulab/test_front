import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      customer: {
          id: '',
          email: '',
          phone: '',
          name: '',
      },
      loginFlag: false,
      count: 0,
    },
    mutations: {
      setCustomer: function(state, payload){        
        console.log("setCustomer mutation : " + payload.email)
        state.customer.id = payload.id
        state.customer.email = payload.email
        state.customer.phone = payload.phone
        state.customer.name = payload.name
      },
      login(state){
          state.loginFlag = true;
      },
      logout(state){
        state.loginFlag = false;
        state.customer.id = ""
        state.customer.email = ""
        state.customer.phone = ""
        state.customer.name = ""
      },
      increment (state, value) {
        state.count += value
      }
    }
  })
