import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state = {
    monthly: {},
    yearly: {},
    daily: {},
    tempYearly: {},
    tempMonthly: {},
    tempDaily: {}
};

const namespaced = true;

export const statistics = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};