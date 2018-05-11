import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import StyleGuide from '@/components/StyleGuide';
import Profile from '@/components/Profile';
import Assistance from '@/components/Assistance';
import Teachers from '@/components/Teachers';
import Schedule from '@/components/Schedule';
import Observations from '@/components/Observations';
import Classmates from '@/components/Classmates';
import Regulation from '@/components/Regulation';
import Parents from '@/components/Parents';

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
          path: '/Dashboard',
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
        },
        {
          path: 'Teachers',
          name: 'Teachers',
          component: Teachers,
          meta: { reqAuth: true },
        },
        {
          path: 'Schedule',
          name: 'Schedule',
          component: Schedule,
          meta: { reqAuth: true },
        },
        {
          path: 'Observations',
          name: 'Observations',
          component: Observations,
          meta: { reqAuth: true },
        },
        {
          path:'Classmates',
          name: 'Classmates',
          component: Classmates,
          meta: {reqAuth: true},
        },
        {
          path:'Regulation',
          name: 'Regulation',
          component: Regulation,
          meta: {reqAuth: true},
        },
        {
          path:'Parents',
          name: 'Parents',
          component: Parents,
          meta: {reqAuth: true},
        },
      ]
    }
  ]
});
