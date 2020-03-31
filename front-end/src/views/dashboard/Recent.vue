<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-top">
                <h4 class="card-title m-0 float-left">{{ title }}</h4><!-- /.content-title -->
            </div>

                <div class="align-self-center my-2 text-r">
                    <div class="row">
                        <div class="col-sm-6">
                            <Tweet id="692527862369357824"></Tweet>
                        </div>
                        <div class="col-sm-6">
                            <Tweet id="692527862369357824"></Tweet>
                        </div>
                        <div class="col-sm-6">
                            <Tweet id="692527862369357824"></Tweet>
                        </div>
                        <div class="col-sm-6">
                            <Tweet id="692527862369357824"></Tweet>
                        </div>                                              
                    </div>
                    
                </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Tweet } from 'vue-tweet-embed'

export default{
    props: ['icon', 'symbol', 'counter', 'title', 'bgclass', 'hasPercentage', 'canvasId'],
    components:{
        Tweet
    },
    data() {
        return {
            done: false
        }
    },
    computed: {

    }
}
</script>