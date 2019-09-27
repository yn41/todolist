<template>
  <div id="app">
    <planHeader/>
    <router-view/>
  </div>
</template>
<script> 
import planHeader from '@/components/Header.vue';

export default {
  components: {
    planHeader,
  },
};
</script>
