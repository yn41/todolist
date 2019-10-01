<template>
    <div class="wrap">
        <div v-if="!api.loading">
            <div class="tit"> 
                <div class="bx sun"><b>일요일</b></div>
                <div class="bx">월요일</div>
                <div class="bx">화요일</div>
                <div class="bx">수요일</div>
                <div class="bx">목요일</div>
                <div class="bx">금요일</div>
                <div class="bx sat"><b>토요일</b></div>
            </div>
            <div class="cont">
                <!-- //공휴일 y 국경일 c 일욜일 sun 토요일 sat 평일 n -->
                <div class="bx" v-for="item in list" :key="item.key" v-bind:class="item.isHoliday == 'sun'?'sun':(item.isHoliday == 'sat'?'sat':(item.isHoliday =='y'?'rest1':(item.isHoliday =='c'?'rest2':'')))">
                    <b v-if="item.date !== 0">{{item.date}}</b>
                    <span>{{item.rest}}</span>
                </div>
            </div>
            <p class="info" v-if="list[0].year > 2020 || list[0].year < 2015"><b>* 공휴일 Api는 2015년부터 내년까지 공휴일 제공 됩니다.</b></p>
            <p class="info" v-if="api.error"><b>* 공휴일은 api 보안문제로 로컬에서만 확인 가능합니다!</b></p>
        </div>
        <div v-else class="bx_loading">
            <h3>Loading...</h3>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        'list':Array,
        'month':Number,
        'api':{}
    },
    created(){
    }
}
</script>