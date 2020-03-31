<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-top">
                <h4 class="card-title m-0 float-left">{{ title }}</h4><!-- /.content-title -->
            </div>
                <div class="align-self-center my-2 text-r">
                    <span class='badge badge-success'>Nº de Tweets</span>
                    <span class='badge badge-danger'>Nº de RTs</span>
                </div>
                
        </div>
    </div>
</template>

<script>
import TrafficChart from './charts/TrafficChart.vue';
import { mapGetters } from 'vuex'

export default{
    props: ['icon', 'symbol', 'counter', 'title', 'bgclass', 'hasPercentage', 'canvasId'],
    components:{
        TrafficChart
    },
    data() {
        return {
            done: false,
            labels: [],
            series: []
        }
    },
    computed: {
        ...mapGetters('statistics', ['yearly']),
        ...mapGetters('statistics', ['monthly']),
        ...mapGetters('search', ['search']),
        isReady: function() {
            if(this.search.day) {
                return false;
            } 

            if(this.search.month) {
                if(Object.keys(this.monthly).length < 12) {
                    return false;
                }

                this.labels = [];
                this.series = [];
                this.series[0] = [];
                this.series[1] = [];

                let keys = Object.keys(this.monthly);
                let monthsName = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 
                    'Set', 'Out', 'Nov', 'Dez'];

                for(let i = 0; i < monthsName.length; i++) {
                    this.labels.push(monthsName[i]);
                    this.series[0].push(this.monthly[monthsName[i]].numTweets);
                    this.series[1].push(this.monthly[monthsName[i]].numRts);
                }

                return true;
            }

            if(this.search.year) {
                if(Object.keys(this.yearly).length < 10) {
                    return false;
                }

                this.labels = [];
                this.series = [];
                this.series[0] = [];
                this.series[1] = [];

                for(let i = 0; i < Object.keys(this.yearly).length; i++) {
                    this.labels.push('202' + i);
                    this.series[0].push(this.yearly['202' + i].numTweets);
                    this.series[1].push(this.yearly['202' + i].numRts);
                }

                return true;
            }
        }
    }
}
</script>