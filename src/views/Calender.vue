<template>
  <div class="calender">
    <!-- <div class="top">
      <h1>{{toDay.year}}년 {{toDay.month+1}}월</h1>
      <div class="btns">
        <button type="button" @click="getPrevMonth">이전달</button>
        <button type="button" @click="getNextMonth">다음달</button>
      </div>
    </div> -->
    <CalenderHeader :toDay="toDay" @getMonthEvent="getOtherMonth" @changeMounthEvent="changeMounth"/>
    <CalenderVeiw :list="list" :api="api"/>
  </div>
</template>
<script>
import CalenderVeiw from '@/components/CalenderVeiw.vue';
import CalenderHeader from '@/components/CalenderHeader.vue';
import axios from 'axios';

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
        rest: null,
        isHoliday: 'n',
        key: ""+new Date().getFullYear()+(new Date().getMonth()+1)+new Date().getDate()
      },
      day: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      //인증키 발급시 utf-8로 인코딩되서 줘서 디코딩을 해줘야함
      serviceKey:decodeURIComponent("VN%2BdeeEAr2XgLFywD98WjBFfbqh6bahBMb%2Bxjr0kgK%2BCyOzHGHmtcyKc46YINx8VwWmiHWbm2vf48d6B%2F2C5WQ%3D%3D"),
      restList:[],
      api:{
        loading:false,
        error:false
      }
    }
  },
  methods:{
    settingCalendar(){
      //api 세팅
      this.api.loading = true;
      this.api.error = false;
      let solMonth = this.toDay.month + 1;
      solMonth = this.setDate(solMonth);
      //이 api는 2015년 ~ 2020년 공휴일만 가져옴
      const baseURI = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo'; 
      // const baseURI = '//localhost:8080/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo';
      axios.get(baseURI, {
        params:{
          'serviceKey' : this.serviceKey,
          'solYear': this.toDay.year,
          'solMonth': solMonth,
          '_type':'json'
        }
      }).then((res)=>{
        this.api.loading = false;
        this.restList = [];
        if(res.data.response.body.totalCount > 1){
          //api 값 가져오기
          this.restList = res.data.response.body.items.item;
        }else if(res.data.response.body.totalCount == 1){
          //1개의 데이터가 올 경우 배열이 아닌 객체로 들어가서 처리함  
          this.restList[0] = res.data.response.body.items.item;
        }
        // console.log(this.restList);
        //달력을 그리자!!
        this.buildCalendar();
      }).catch((e)=>{
        console.log("--------------api error---------------");
        this.api.loading = false;
        this.api.error = true;
        console.log(e);
      });
    },
    buildCalendar(){
      this.list = [];
      //이달의 첫날 마지막날 구하기
      let doDate = new Date(this.toDay.year, this.toDay.month, 1);
      let lastDate = new Date(this.toDay.year,this.toDay.month+1, 0);
      //날짜 세팅
      for(let i = 1; i <= lastDate.getDate(); i++){
        let temp = new Date(this.toDay.year,this.toDay.month,i);
        this.list[i-1] =  this.settingDate(temp, 1, "rest"); //(데이터 넣기, 달이 0부터 시작해서 맞추기 위한 값,  공휴일 찾기
        // console.log(this.list[i-1]);
      }
      //달력 빈공간 세팅
      let tempData = {
        year : doDate.getFullYear(),
        month: doDate.getMonth()+1,
        date: 0,
        day: null,
        rest: ""
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
    },
    getOtherMonth($type){
     console.log(this.toDay.year);
     if($type =="prev") this.toDay.month--;
      else if($type =="next") this.toDay.month++;
      // else if($type =="year") 
      // else this.toDay.month++;
      let temp = new Date(this.toDay.year,this.toDay.month,1);
      this.toDay = this.settingDate(temp,0);
      this.settingCalendar();
    },
    //공휴일 찾기
    findRestDate($temp){
      let data = null;
      //해당 날짜가 공휴일인지 확인
      this.restList.forEach(item => {
        //해당 날짜 (api로 받는 날짜 형식 : 20190901)
        let restDate = ""+$temp.getFullYear()+ this.setDate($temp.getMonth()+1) + this.setDate($temp.getDate());
        if(restDate == item.locdate){
          data = item
          return;
        }
      });
      if(data !== null) return data;
      // if(dateName !== "") return dateName;
      return null;
    },
    //날짜 세팅
    settingDate($temp, $num, $mode){
      //공휴일 찾는 모드일때만 실행
      let data = ($mode=="rest")?this.findRestDate($temp):"";

       //공휴일 y 국경일 c 일욜일 sun 토요일 sat 평일 n
      let isHoliday = (data == null)?'n':(data.isHoliday == 'N'?'c': 'y');
      if(data == null){
        isHoliday =  $temp.getDay() == 0 ? "sun" : (($temp.getDay() == 6) ? "sat":""); 
      }
      
      return {
        year : $temp.getFullYear(),
        month: $temp.getMonth()+$num,
        date: $temp.getDate(),
        day: $temp.getDay(),
        rest: data!==null?data.dateName:null,
        isHoliday: isHoliday,
        key: ""+$temp.getFullYear()+($temp.getMonth()+1)+$temp.getDate()
      }
    },
    //2자리 숫자로 만들기 api가 1자리 숫자 인식못함
    setDate($num){
      let temp = "";
      if($num < 10) temp = "0" + $num;
      else temp = $num;
      return temp;
    },
    changeMounth($type){
      console.log(this.toDay.year);
    }
  },
  created(){
    this.settingCalendar();
  },
  components: {
    CalenderVeiw,
    CalenderHeader
  },
}
</script>