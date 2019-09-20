import Vue from 'vue';
import Router from 'vue-router';
import todo from './views/Todo.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', //라우터 #제거
  routes: [
    {
      path: '/',
      name: 'todo',
      component: todo,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
