<template>
	<div id="traffic-chart" class="traffic-chart"></div>
</template>


<script>

import Chartist from 'chartist'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { mapGetters } from 'vuex'

export default{
props: ['labels', 'series'],
name: 'dashboard-traffic-chart',
data(){
	return {
		canvasId: 'traffic-chart'
	}
},
watch: {
	'series': function() {
		var chart = new Chartist.Line('#traffic-chart', 
			{
				labels: this.labels,
				series: this.series
			}, {
				low: 0,
				showArea: true,
				showLine: false,
				showPoint: false,
				fullWidth: false,
				axisX: {
					showGrid: true
				}
			});

		chart.on('draw', function(data) {
			if(data.type === 'line' || data.type === 'area') {
			data.element.animate({
				d: {
				begin: 500 * data.index,
				dur: 1000,
				from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
				to: data.path.clone().stringify(),
				easing: Chartist.Svg.Easing.easeOutQuint
				}
			});
			}
		});
	}
},

//template: "<div :id='canvasId'></div>",
template: '<div :id="canvasId" class="traffic-chart"></div>',
mounted() {
	var chart = new Chartist.Line('#traffic-chart', 
		{
			labels: this.labels,
			series: this.series
		}, {
			low: 0,
			showArea: true,
			showLine: false,
			showPoint: false,
			fullWidth: false,
			axisX: {
				showGrid: true
			}
		});

	chart.on('draw', function(data) {
		if(data.type === 'line' || data.type === 'area') {
		data.element.animate({
			d: {
			begin: 500 * data.index,
			dur: 1000,
			from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
			to: data.path.clone().stringify(),
			easing: Chartist.Svg.Easing.easeOutQuint
			}
		});
		}
	});
}
}
</script>

<style>
	@import "../../../../node_modules/chartist/dist/chartist.min.css"
</style>