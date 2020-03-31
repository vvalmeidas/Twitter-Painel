import Vue from 'vue'

export const mutations = {
    resetDaily(state) {
        Vue.set(state, 'tempDaily', {});
    },
    addDaily(state, data) {
        let daily = state.tempDaily;
        daily[data[0].toString()] = data[1];

        if (Object.keys(daily).length == data[2]) {
            Vue.set(state, 'daily', daily);
        } else {
            Vue.set(state, 'tempDaily', daily);
        }
    },
    resetMonthly(state) {
        Vue.set(state, 'tempMonthly', {});
    },
    addMonthly(state, data) {
        let monthly = state.tempMonthly;
        monthly[data[0]] = data[1];

        if (Object.keys(monthly).length == 12) {
            Vue.set(state, 'monthly', monthly);
        } else {
            Vue.set(state, 'tempMonthly', monthly);
        }
    },
    resetYearly(state) {
        Vue.set(state, 'tempYearly', {});
    },
    addYearly(state, data) {
        let yearly = state.tempYearly;
        yearly[data[0].toString()] = data[1];

        if (Object.keys(yearly).length == 10) {
            Vue.set(state, 'yearly', yearly);
        } else {
            Vue.set(state, 'tempYearly', yearly);
        }
    }
};