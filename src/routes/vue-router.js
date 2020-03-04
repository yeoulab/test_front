import Vue from 'vue';
import Router from 'vue-router'

import AdPanel from '../components/advertisement/AdPanel'
import Contract from '../components/contract/Contract'
import MapNav from '../components/map/Map'
import Home from '../components/home/Home'

import MyInfo from '../components/my/MyInfo'
import Login from '../components/my/Login'
import Register from '../components/my/Register'

Vue.use(Router);

export default new Router({
    routes:[
        {path: '/', component: Home},
        {path: '/home', component: Home},
        {path: '/map', component: MapNav},
        {path: '/contract', component: Contract},
        {path: '/advertisement', component: AdPanel},
        {path: '/myInfo', component: MyInfo},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
    ]
})
