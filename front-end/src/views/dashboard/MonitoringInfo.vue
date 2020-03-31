<template>
    <div>
        <div class="card">
            <div class="card-top">
                <h4 class="card-title m-0 float-left">{{ title }}</h4><!-- /.content-title -->
            </div><!-- /.card-top -->
            
            <div class="card-body p-0">
                <div class="row">
                    <div class="col-sm-6">
                        <img class="img-responsive img-thumbnail img-avatar rounded-circle my-3 mx-auto d-block" :src=image alt="User Avatar">
                    </div>

                    <div class="col-sm-6 my-2">
                        <h3 class="pb-2 display-5 text-center my-2">
                            {{ name }}
                        </h3>

                        <div class="mx-3">
                            <i class="fa fa-tags info-icon icon-left"></i>
                            <span class="pb-2 display-5 text-right">{{ query }}</span>
                        </div>

                        <div class="mx-3">
                            <i class="fa fa-building-o icon-left"></i>
                            <span class="pb-2 display-5 text-right">{{ city }}</span>
                        </div>

                        <div class="mx-3">
                            <i class="fa fa-location-arrow info-icon icon-left"></i>
                            <span class="pb-2 display-5 text-right">{{ latitude }} / {{ longitude }}</span>
                        </div>

                        <div class="mx-3">
                            <i class="fa fa-circle-o-notch info-icon icon-left"></i>
                            <span class="pb-2 display-5 text-right">{{ area }}</span>
                        </div>
                        <div class="mx-3">
                            <i class="fa fa-calendar info-icon icon-left"></i>
                            <span class='badge badge-primary' v-if='day'>{{ day }}</span>
                            <span class='badge badge-success' v-if='month'>{{ month }}</span>
                            <span class='badge badge-danger' v-if='year'>{{ year }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import RealTimeChart from './charts/RealTimeChart.vue';

export default{
    props: ['icon', 'symbol', 'counter', 'day', 'month', 'year', 'image', 'time', 'title', 'name', 'city', 'query', 'latitude', 'longitude', 'area', 'bgclass', 'hasPercentage', 'canvasId'],
    components:{
        RealTimeChart
    }
}
</script>