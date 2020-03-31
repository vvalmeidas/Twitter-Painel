import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
    selected: ''
};

const namespaced = true;

export const options = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};