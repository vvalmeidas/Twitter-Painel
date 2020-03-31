import Vue from 'vue'

export const mutations = {
    setSelected(state, selected) {
        Vue.set(state, 'selected', selected);
    },
};