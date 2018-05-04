import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import StyleGuide from '@/components/StyleGuide';
import Profile from '@/components/Profile';
import Assistance from '@/components/Assistance';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { reqAuth: true },

      children: [
        {
          path: '',
          name: 'Profile',
          component: Profile,
          meta: { reqAuth: true },
        },
        {
          path: 'StyleGuide',
          name: 'StyleGuide',
          component: StyleGuide,
          meta: { reqAuth: true },
        },
        {
          path: 'Assistance',
          name: 'Assistance',
          component: Assistance,
          meta: { reqAuth: true },
        }
      ]
    }
  ]
});
