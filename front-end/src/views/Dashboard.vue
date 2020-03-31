<template>

    <div class="row" v-if='statistic'>
      <div class="col-sm-6">
          <MonitoringInfo 
            title="Informações"
            :image=monitoring.image
            :name=monitoring.name
            :query=monitoring.query
            :city=monitoring.cityName
            :latitude=monitoring.lat
            :longitude=monitoring.long
            :area=monitoring.radius
            :time=2
            :day=search.day
            :month=monthName
            :year=search.year
          >
          </MonitoringInfo>
      </div>

      <div class="col-sm-3">
        <info
            icon="icon-lg fa fa-twitter"
            bgclass="bg-flat-color-2"
            :counter=statistic.numTweets
            title="Tweets"
        >
        </info>

        <info
            icon="icon-lg fa fa-globe"
            bgclass="bg-flat-color-5"
            :counter=numLanguages
            canvasId="flotBar1"
            title="Idiomas"
        >
        </info>
      </div>

      <div class="col-sm-3">
        <info
            icon="icon-lg fa fa-retweet"
            bgclass="bg-flat-color-4"
            :counter=statistic.numRts
            title="Retweets"
        >
        </info>

        <info
            icon="icon-lg pe-7f-graph3"
            symbol="%"
            hasPercentage="yes"
            bgclass="bg-flat-color-3"
            :counter=orgTweets
            canvasId="flotBar1"
            title="são RT"
        >
        </info>
      </div>

      <Traffic 
        :title="graphicTitle"
      />
    </div>

    <div class="col-sm-12" v-else>
      <loader :color="'#fe1c45'" :borderWidth="10" :duration=".5" :size="70" :background="'#f1f1f7'"/>
    </div>


</template>

<script>
import Info from './dashboard/InfoBox.vue';
import InfoChart from './dashboard/InfoBoxChart.vue';
import InfoChartTwo from './dashboard/InfoBoxChart2.vue';
import RealTime from './dashboard/RealTime.vue';
import Traffic from './dashboard/Traffic.vue';
import EarningStats from './dashboard/EarningStats.vue';
import Download from './dashboard/Download.vue';
import Revenue from './dashboard/Revenue.vue';
import MonitoringInfo from './dashboard/MonitoringInfo.vue';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import loader from '@nulldreams/vue-loading/src/components/loader';

export default{
    name: 'dashboard',
    components: {
      Info,
      InfoChart,
      InfoChartTwo,
      RealTime,
      Traffic,
      EarningStats,
      Download,
      Revenue,
      MonitoringInfo,
      loader
    },
    data () {
        return {
          loading: false,
          countTweets: 0,
          post: null,
          error: null,
          monitoring: null
        }
  },
  watch: {
    '$route': 'updatePage'
  },
  mounted() {
    this.updatePage();
  },
  methods: {
    updatePage: function() {
      this.$store.dispatch('search/resetStatistic');

      if(this.$route.params.i) {
        this.$store.dispatch('search/setIndex', this.$route.params.i);
        this.$store.dispatch('statistics/reset');
        this.$store.dispatch('statistics/loadYearlyStatistics', this.monitorings[this.$route.params.i].id);
      } else if(this.$route.params.y) {
        this.$store.dispatch('search/setYear', this.$route.params.y);
        this.$store.dispatch('statistics/reset');      
        this.$store.dispatch('statistics/loadYearlyStatistics', this.monitorings[this.search.index].id);
      } else if(this.$route.params.m) {
        this.$store.dispatch('search/setMonth', this.$route.params.m);
        this.$store.dispatch('statistics/reset');
        this.$store.dispatch('statistics/loadMonthlyStatistics', [this.monitorings[this.search.index].id, this.search.year]);
      } else if(this.$route.params.d) {
        this.$store.dispatch('search/setDay', this.$route.params.d);
        this.$store.dispatch('statistics/reset');
        this.$store.dispatch('statistics/loadDailyStatistics', [this.monitorings[this.search.index].id, this.search.month, this.search.year]);
      } else {
        this.$store.dispatch('search/setIndex', 0);
        this.$store.dispatch('search/setYear', '2020');
        this.$store.dispatch('statistics/reset');
        this.$store.dispatch('statistics/loadYearlyStatistics', this.monitorings[0].id);
        this.monitoring = this.monitorings[0];
      }

      if(this.search.index) {
        this.monitoring = this.monitorings[this.search.index];
      } 

      this.$store.dispatch('search/load', this.monitoring.id);
    }
  },
  computed: {
    ...mapGetters('monitorings', ['monitorings']),
    ...mapGetters('search', ['search']),
    ...mapGetters('search', ['statistic']),
    orgTweets: function() {
      return this.statistic.numTweets == '0' ? 0 : Math.round((this.statistic.numRts / this.statistic.numTweets)*100);
    },
    monthName: function() {
      var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      return months[Number(this.search.month - 1)];
    },
    numLanguages: function() {
      if(typeof this.statistic.languages != 'undefined') {
        return this.statistic.languages.length;
      }

      return '0';
    },
    graphicTitle: function() {
      if(this.search.day) {
        return "Evolução Diária";
      }

      if(this.search.month) {
        return "Evolução Mensal";
      }

      if(this.search.year) {
        return "Evolução Anual";
      }
    }
  }
}


</script>

<style>

</style>