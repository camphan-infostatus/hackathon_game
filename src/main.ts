import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Intro from './Intro.vue';
import MainGame from './MainGame.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Intro },
  { path: '/game', component: MainGame },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
