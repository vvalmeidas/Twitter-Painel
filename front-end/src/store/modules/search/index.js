import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
    index: null,
    year: null,
    month: null,
    day: null,
    statistic: null
};

const namespaced = true;

export const search = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};