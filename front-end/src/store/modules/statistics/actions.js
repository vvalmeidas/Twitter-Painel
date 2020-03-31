import axios from 'axios'

export const actions = {
    loadDailyStatistics(context, data) {
        let maxDayInMonth = new Date(data[2], data[1], 0).getDate();
        let urlBase = 'https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/search?table=statistics&n=10';
        let statistic;

        context.commit('resetDaily');

        for (let i = 1; i <= maxDayInMonth; i++) {
            let url = urlBase + '&idMonitoring=' + data[0];
            let dayTemp = new String(i).length == 2 ? i : '0' + i;
            url += '&dayMonthYear=' + 'd' + dayTemp + 'm' + data[1] + 'y' + data[2];
            let day = i;

            axios.get(url)
                .then((response) => {
                    if (response.data.count == 1) {
                        statistic = response.data.data[0];
                    } else if (response.data.count == 0) {
                        statistic = {};
                        statistic.numTweets = 0;
                        statistic.numRts = 0;
                        statistic.languages = [];
                    }

                    context.commit('addDaily', [day, statistic, maxDayInMonth]);
                });
        }
    },
    loadMonthlyStatistics(context, data) {
        let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let monthsName = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
            'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ]
        let urlBase = 'https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/search?table=statistics&n=10';
        let statistic;

        context.commit('resetMonthly');

        for (var i in months) {
            let url = urlBase + '&idMonitoring=' + data[0];
            url += '&dayMonthYear=' + 'm' + months[i] + 'y' + data[1];
            let month = monthsName[i];

            axios.get(url)
                .then((response) => {
                    if (response.data.count == 1) {
                        statistic = response.data.data[0];
                    } else if (response.data.count == 0) {
                        statistic = {};
                        statistic.numTweets = 0;
                        statistic.numRts = 0;
                        statistic.languages = [];
                    }

                    context.commit('addMonthly', [month, statistic]);
                });
        }
    },
    loadYearlyStatistics(context, idMonitoring) {
        let years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];
        let urlBase = 'https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/search?table=statistics&n=10';
        let statistic;

        context.commit('resetYearly');

        for (let i in years) {
            let url = urlBase + '&idMonitoring=' + idMonitoring;
            url += '&dayMonthYear=y' + years[i];

            axios.get(url)
                .then((response) => {
                    if (response.data.count == 1) {
                        statistic = response.data.data[0];
                    } else if (response.data.count == 0) {
                        statistic = {};
                        statistic.numTweets = 0;
                        statistic.numRts = 0;
                        statistic.languages = [];
                    }
                    context.commit('addYearly', [years[i], statistic, idMonitoring]);
                });
        }
    },
    reset(context) {
        context.commit('resetYearly');
        context.commit('resetMonthly');
        context.commit('resetYearly');
    }

};