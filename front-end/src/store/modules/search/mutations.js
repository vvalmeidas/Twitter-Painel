import Vue from 'vue'

export const mutations = {
    setIndex(state, index) {
        Vue.set(state, 'index', index);
    },
    setYear(state, year) {
        Vue.set(state, 'year', year);
    },
    setMonth(state, month) {
        Vue.set(state, 'month', month);
    },
    setDay(state, day) {
        Vue.set(state, 'day', day);
    },
    setStatistic(state, statistic) {
        Vue.set(state, 'statistic', statistic);
    }
};