<template>
  <div class="calender">
    <h1>달력!</h1>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  created(){
    let date = new Date();
    console.log(date.getMonth());
    console.log(date.getMonth()+1);
  }
}
</script>