import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home'
import timeline from './components/timeline'
import container from './components/container'
import loadmore from './components/loadmore'
import fullscreen from './components/fullscreen'
import ruler from './components/ruler'

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
  {
    path: '/container',
    name: 'container',
    component: container,
  },
  {
    path: '/loadmore',
    name: 'loadmore',
    component: loadmore,
  },
  {
    path: '/fullscreen',
    name: 'fullscreen',
    component: fullscreen,
  },
  {
    path: '/ruler',
    name: 'ruler',
    component: ruler,
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;