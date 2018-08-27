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
import Familyguy from './components/Familyguy';
import CoursesExams from './components/CoursesExams';
import ModalityExams from './components/ModalityExams';
import Exam from './components/Exam';
import Payment from './components/Payment';
import Events from './components/Events';
import RolExams from './components/RolExams';

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
      },
      {
        path:'CoursesExams',
        component:CoursesExams,
        meta: { reqAuth: true },
      },
      {
        path:'ModalityExams',
        component:ModalityExams,
        meta:{ reqAuth: true},
      },
      {
        path:'Exam',
        component:Exam,
        props: (route) => ({modalidad: route.query.mod, examen: route.query.exam, idmodalidad: route.query.idmod}),
        meta:{ reqAuth: true},
      },
      {
        path: 'Payment',
        component: Payment,
        meta: { reqAuth: true },
      },
      {
        path: 'Events',
        component: Events,
        meta: { reqAuth: true },
      },
      {
        path: 'RolExams',
        component: RolExams,
        meta: { reqAuth: true },
      },
    ]
  },
  {
    path: '/Familyguy',
    component: Familyguy,
    meta: { reqAuth: true },
  }
]