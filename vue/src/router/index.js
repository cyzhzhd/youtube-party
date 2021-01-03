import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../view/main.vue';
import room from '../view/room.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/room/:roomId',
    name: 'room',
    component: room,
  },
];
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
