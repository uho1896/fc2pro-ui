import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home'
import timeline from './components/timeline'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: timeline,
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;