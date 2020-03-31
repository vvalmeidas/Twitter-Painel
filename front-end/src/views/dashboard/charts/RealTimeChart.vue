<script>
  import Vue from 'vue';
  import jquery from 'jquery'

  import '../../../assets/js/lib/flot-chart/jquery.flot.js';
  import '../../../assets/js/lib/flot-chart/jquery.flot.pie.js';
  import '../../../assets/js/lib/flot-chart/jquery.flot.spline.js';


  export default{
      name: 'dashboard-realtime-chart',
      data(){
        return{
            canvasId: 'flotRealtime2'
        }
      },
      template: "<div :id='canvasId'></div>",
      mounted () {}
}
</script>