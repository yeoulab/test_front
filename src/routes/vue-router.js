import Vue from 'vue';
import Router from 'vue-router'

import AdPanel from '../components/advertisement/AdPanel'
import Contract from '../components/contract/Contract'
import Login from '../components/my/Login'
import MapNav from '../components/map/Map'
import Home from '../components/home/Home'

Vue.use(Router);

export default new Router({
    routes:[
        {path: '/', component: Home},
        {path: '/home', component: Home},
        {path: '/map', component: MapNav},
        {path: '/contract', component: Contract},
        {path: '/advertisement', component: AdPanel},
        {path: '/my', component: Login},

    ]
})