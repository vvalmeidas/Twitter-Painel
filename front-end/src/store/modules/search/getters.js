export const getters = {
    search: state => {
        return state;
    },
    statistic: state => {
        return state.statistic;
    },
    dayMonthYear: state => {
        let dayMonthYear = '';

        if (state.day) {
            dayMonthYear += 'd' + state.day;
        }

        if (state.month) {
            dayMonthYear += 'm' + state.month;
        }

        if (state.year) {
            dayMonthYear += 'y' + state.year;
        }

        return dayMonthYear;
    }
};