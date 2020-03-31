import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import { monitorings } from './modules/monitorings';
import { search } from './modules/search';
import { statistics } from './modules/statistics';
import { options } from './modules/options';


import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: false, // process.env.NODE_ENV !== 'production',
    getters,
    modules: {
        app,
        monitorings,
        search,
        statistics,
        options
    },
    state: {},
    mutations: {}
})

export default store