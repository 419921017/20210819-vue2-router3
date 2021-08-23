import Vue from 'vue';
// import VueRouter from "vue-router";
import VueRouter from '@/vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'a',
        component: {
          render(h) {
            return h('div', 'a');
          },
        },
      },
      {
        path: 'b',
        component: {
          render(h) {
            return h('div', 'b');
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
