<template>
    <div class="header">
        <h1>
            <form @submit.prevent="">
               
                <select class="slct year" v-model="toDay.year" @change="changeMounth('yaer')">
                    <option  v-for="year in list" :key='year'>{{year}}</option>
                </select>년 
                <select class="slct month" v-model="toDay.month+1"  @change="changeMounth('month')">
                    <option  v-for="month in 12" :key='month'>{{month}}</option>
                </select>월
            </form>
        </h1>
        <div class="btns">
            <button type="button" @click="getOtherMonth('prev')">이전달</button>
            <button type="button" @click="getOtherMonth('next')">다음달</button>
        </div>
    </div>
</template>
<script>
export default { 
    data(){
        return {
            list:[]
        }
    },
    props:{
        toDay:{}
    },
    methods:{
        getOtherMonth($type){
            this.$emit('getMonthEvent' , $type);
        },
        changeMounth($type){
            console.log(this.toDay.year);
            console.log(this.toDay.month);
            if($type=="year") this.$emit('getMonthEvent', $type);
            else this.$emit('getMonthEvent', $type);
        },
    },
    created(){
        for(let i=1900; i <= 2050; i++){
            this.list.push(i);
        }
    },
}
</script>