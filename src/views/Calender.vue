<template>
  <div class="calender">
    <h1>{{month}}월</h1>
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
      day: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    }
  },
  methods:{
    settingCalendar(){
      let date = new Date();
      let toDay = {
        year : date.getFullYear(),        
        month: date.getMonth()+1,      
        date: date.getDate(),
        day: date.getDay()
      }
      let doDate = new Date(date.getFullYear(),date.getMonth(), 1);
      let lastDate = new Date(date.getFullYear(),date.getMonth()+1, 0);
      this.month = doDate.getMonth()+1;

      for(let i = 1; i <= lastDate.getDate(); i++){
        let temp = new Date(date.getFullYear(),date.getMonth(),i);
        let tempData = {
          year : temp.getFullYear(),
          month: temp.getMonth()+1,
          date: temp.getDate(),
          day: temp.getDay()
        }
        this.list[i-1] = tempData;
        // if(i !== 1 && tempData.day == 6){
        //   console.log("토욜입니다.");
        // }
      }
      if(doDate.getDay() !== 0){
        for(let i = 0; i<7; i++){
          let tempData = {
            year : doDate.getFullYear(),
            month: doDate.getMonth()+1,
            date: 0,
            day: null
          }
          if(i == doDate.getDay())
            break;
          else
            this.list.unshift(tempData);
        }
      }
      console.log(this.list);
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