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
    children:[
      {
        path:'',
        component:Profile
      },
      {
        path:'Observations',
        component:Obervations
      },
      {
        path:'Teachers',
        component:Teachers
      },
      {
        path:'Classmates',
        component:Classmates
      },
      {
        path:'Assistance',
        component:Assistance
      },
      {
        path:'Parents',
        component:Parents
      },
      {
        path:'Regulation',
        component:Regulation
      },
      {
        path:'Schedule',
        component:Schedule
      }
    ]
  }
]