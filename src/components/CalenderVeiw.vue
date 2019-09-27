<template>
    <div class="wrap">
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
            <div class="bx" v-for="item in list" :key="item.key" v-bind:class="item.isHoliday == 'sun'?'sun':(item.isHoliday == 'sat'?'sat':(item.isHoliday =='y'?'rest':''))">
                <b v-if="item.date !== 0">{{item.date}}</b>
                <span>{{item.rest}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        'list':Array,
        'month':Number
    },
    created(){
    }
}
</script>