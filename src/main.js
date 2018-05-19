import Vue from 'vue'
import VueRouter from 'vue-router'

import{routes} from './routes'
import {token} from './cfg/core'
import jwt_decode from 'jwt-decode'
import App from './App.vue'

Vue.use(VueRouter);

const router = new VueRouter({routes});

//Navigations Guards
router.beforeEach((to,from,next)=>{
  let currentUser = false;
  let myToken = localStorage.getItem(token);  //replace token name
  let reqAuth,isFamilyGuy,isStudent,type;

  if (myToken!=null){
    currentUser = true;  
    type = jwt_decode(myToken).type; //get type user 
  }    
  
  reqAuth     = to.meta.reqAuth; 
  isFamilyGuy = to.meta.isFamilyGuy;
  isStudent   = to.meta.isStudent;

  if(reqAuth){
    if(!currentUser){next('/')}       //replace view login
    else{
      if(isFamilyGuy){        
        if(type==='familyGuy'){next()}
        else{next('/Dashboard')}               //replace view student
      }else if(isStudent){
        if(type==='student'){next()}
        else{next('/Familyguy')}              //replace view family guy
      }else{
        next();
      }
    }
  }else if(currentUser){
    if (type === 'familyGuy') { next('/Familyguy')}    //replace view family guy
    if (type === 'student') { next('/Dashboard')}       //replace view student
  }else{
    next();
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
