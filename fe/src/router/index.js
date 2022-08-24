import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './route-config';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    store.dispatch('getAuth').then(() => {
      if (JSON.stringify(store.state.user) !== '{}') {
        next();
      } else {
        next({ name: 'Login' });
      }
    });
  } else if (to.name === null) {
    next({ name: '404', query: { target: to.fullPath } });
  } else {
    next();
  }
});

export default router;
