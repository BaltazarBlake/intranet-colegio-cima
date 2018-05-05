// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {token} from './cfg/core'

//Decode payload JWT
import jwt_decode from 'jwt-decode'

Vue.config.productionTip = false

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
        else{next('/FamilyGuy')}              //replace view family guy
      }else{
        next();
      }
    }
  }else if(currentUser){
    if (type === 'familyGuy') { next('/FamilyGuy')}    //replace view family guy
    if (type === 'student') { next('/Dashboard')}       //replace view student
  }else{
    next();
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
