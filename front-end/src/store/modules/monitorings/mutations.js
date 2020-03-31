import Vue from 'vue'

export const mutations = {
    setMonitorings(state, monitorings) {
        Vue.set(state, 'monitorings', monitorings);
    },
};