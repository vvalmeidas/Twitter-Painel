import axios from 'axios'

export const actions = {
    reset(context) {
        context.commit('setIndex', 0);
        context.commit('setYear', '2020');
    },
    setIndex(context, index) {
        context.commit('setIndex', index);
        context.commit('setYear', '2020');
        context.commit('setMonth', null);
        context.commit('setDay', null);
    },
    setYear(context, year) {
        context.commit('setYear', year);
        context.commit('setMonth', null);
        context.commit('setDay', null);
    },
    setMonth(context, month) {
        context.commit('setMonth', month);
        context.commit('setDay', null);
    },
    setDay(context, day) {
        context.commit('setDay', day);
    },
    load(context, idMonitoring) {
        let dayMonthYear = '';

        if (context.state.day) {
            dayMonthYear += 'd' + context.state.day;
        }

        if (context.state.month) {
            dayMonthYear += 'm' + context.state.month;
        }

        if (context.state.year) {
            dayMonthYear += 'y' + context.state.year;
        }

        let url = 'https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/search?table=statistics&n=1';
        url += '&dayMonthYear=' + dayMonthYear;
        url += '&idMonitoring=' + idMonitoring;

        axios.get(url).then((response) => {
            let statistic;

            if (typeof response.data.data[0] != 'undefined') {
                statistic = response.data.data[0];
            } else {
                statistic = {};
                statistic.numTweets = 0;
                statistic.numRts = 0;
                statistic.languages = [];
            }

            context.commit('setStatistic', statistic);
        });
    },
    resetStatistic(context) {
        context.commit('setStatistic', null);
    }
};