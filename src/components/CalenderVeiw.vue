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
            <div class="bx" v-for="item in list" :key="item.key" v-bind:class="item.day == 0?'sun':(item.day == 6?'sat':'')">
                <b v-if="item.date !== 0">{{item.date}}</b>
                <!-- <div class="cont">
                    내용
                </div> -->
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