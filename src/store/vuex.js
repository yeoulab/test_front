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
      pageName: '',
      stockInfo: {
        item_name: '',
        item_code: '',
        start_date: '',
      },
      stats_result: [],
      diary_result: [],
      theme_result: [],
      coin_result: [],
    },
    mutations: {
      setCustomer: function(state, payload){        
        console.log("setCustomer mutation : " + payload.email)
        state.customer.id = payload.id
        state.customer.email = payload.email
        state.customer.phone = payload.phone
        state.customer.name = payload.name
      },
      setStockInfo: function(state, payload){        
        console.log("setCustomer mutation : " + payload.item_name)
        state.stockInfo.item_name = payload.item_name
        state.stockInfo.item_code = payload.item_code
        state.stockInfo.start_date = payload.start_date
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
      },
      setPageName(state, payload){
        state.pageName = payload.pageName
      },
      setStatResult: function(state, payload){
        state.stats_result = payload.stats_result
      },
      setDiaryResult: function(state, payload){
        state.diary_result = payload.diary_result
      },
      setThemeResult: function(state, payload){
        state.theme_result = payload.theme_result
      },
      setCoinResult: function(state, payload){
        state.coin_result = payload.coin_result
      }
    }
  })

