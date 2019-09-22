import Vue from 'vue';
import App from './App.vue';
import router from './router';
import style from './scss/style.scss';

Vue.config.productionTip = false;

//focus 정의
Vue.directive('focus', {
  // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
  inserted: function (el) {
    // 엘리먼트에 포커스를 줍니다
    el.focus()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
