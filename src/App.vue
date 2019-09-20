<template>
  <div id="app">
    <todoHeader/>
    <router-view/>
  </div>
</template>
<script>
import todoHeader from "@/components/TodoHeader.vue";

export default {
  components:{
    todoHeader
  }
}
</script>