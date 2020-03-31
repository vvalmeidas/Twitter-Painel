import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
    monitorings: null
};

const namespaced = true;

export const monitorings = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};