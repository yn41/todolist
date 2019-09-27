<template>
  <div class="calender">
    <div class="top">
      <h1>{{toDay.year}}년 {{toDay.month+1}}월</h1>
      <div class="btns">
        <button type="button" @click="getPrevMonth">이전달</button>
        <button type="button" @click="getNextMonth">다음달</button>
      </div>
    </div>
    <CalenderVeiw :list="list"/>
  </div>
</template>
<script>
import CalenderVeiw from '@/components/CalenderVeiw.vue';

export default {
  data(){
    return {
      list:[],
      month:0,
      toDay:{
        year : new Date().getFullYear(),        
        month: new Date().getMonth(),      
        date: new Date().getDate(),
        day: new Date().getDay(),
        key: new Date().getFullYear()+new Date().getMonth()+new Date().getDate()+new Date().getDay()
      },
      day: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    }
  },
  methods:{
    settingCalendar(){
      this.list = [];
      console.log("달력을 만드러 드립니다~");
      let doDate = new Date(this.toDay.year, this.toDay.month, 1);
      let lastDate = new Date(this.toDay.year,this.toDay.month+1, 0);
      for(let i = 1; i <= lastDate.getDate(); i++){
        let temp = new Date(this.toDay.year,this.toDay.month,i);
        let tempData = {
          year : temp.getFullYear(),
          month: temp.getMonth()+1,
          date: temp.getDate(),
          day: temp.getDay()
        }
        this.list[i-1] = tempData;
      }
      let tempData = {
        year : doDate.getFullYear(),
        month: doDate.getMonth()+1,
        date: 0,
        day: null
      }
      if(doDate.getDay() !== 0){
        for(let i = 0; i<7; i++){
          if(i == doDate.getDay()) break;
          else this.list.unshift(tempData);
        }
      }
      if(lastDate.getDay() !== 6){
        let leangh = 6 - lastDate.getDay();
        for(let i = 0; i<leangh; i++){
          this.list.push(tempData);
        }
      }
      console.log("달력 세팅 완료");
    },
    getPrevMonth(){
      this.toDay.month--
      let temp = new Date(this.toDay.year,this.toDay.month,1);
      let tempData = {
        year : temp.getFullYear(),
        month: temp.getMonth(),
        date: temp.getDate(),
        day: temp.getDay()
      }
      this.toDay = tempData;
      this.settingCalendar();
    },
    getNextMonth(){
      this.toDay.month++
      let temp = new Date(this.toDay.year,this.toDay.month,1);
      let tempData = {
        year : temp.getFullYear(),
        month: temp.getMonth(),
        date: temp.getDate(),
        day: temp.getDay()
      }
      this.toDay = tempData; 
      this.settingCalendar();
    }
  },
  created(){
    this.settingCalendar();
  },
  components: {
    CalenderVeiw,
  },
}
</script>