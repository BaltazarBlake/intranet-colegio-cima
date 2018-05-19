import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Obervations from './components/Observations';
import Teachers from './components/Teachers';
import Classmates from './components/Classmates';
import Assistance from './components/Assistance';
import Parents from './components/Parents';
import Regulation from './components/Regulation';
import Schedule from './components/Schedule';

export const routes = [
  {
    path:'/',
    component: Login
  },
  {
    path:'/Dashboard',
    component: Dashboard,
    meta: { reqAuth: true },
    children:[
      {
        path:'',
        component:Profile,
        meta: { reqAuth: true },
      },
      {
        path:'Observations',
        component:Obervations,
        meta: { reqAuth: true },
      },
      {
        path:'Teachers',
        component:Teachers,
        meta: { reqAuth: true },
      },
      {
        path:'Classmates',
        component:Classmates,
        meta: { reqAuth: true },
      },
      {
        path:'Assistance',
        component:Assistance,
        meta: { reqAuth: true },
      },
      {
        path:'Parents',
        component:Parents,
        meta: { reqAuth: true },
      },
      {
        path:'Regulation',
        component:Regulation,
        meta: { reqAuth: true },
      },
      {
        path:'Schedule',
        component:Schedule,
        meta: { reqAuth: true },
      }
    ]
  }
]