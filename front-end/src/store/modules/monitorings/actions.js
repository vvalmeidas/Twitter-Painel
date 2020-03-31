import axios from 'axios'

export const actions = {
    read(context) {
        axios.get('https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/search?table=monitorings&n=50')
            .then((response) => {
                let monitorings = response.data.data;
                context.commit('setMonitorings', monitorings);
            });
    }
};