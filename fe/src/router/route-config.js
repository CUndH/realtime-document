import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import notFoundView from '../views/404.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/404',
    name: '404',
    component: notFoundView,
  },
];

export default routes;
