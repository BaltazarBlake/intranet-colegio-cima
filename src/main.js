// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//Decode payload JWT
import jwt_decode from 'jwt-decode'

Vue.config.productionTip = false

//Navigations Guards
router.beforeEach((to,from,next)=>{
  let currentUser = false;
  let token = localStorage.getItem('4a511cf5cb8ad5c5fcee27646cbf0043');  //replace token name
  let reqAuth,isFamilyGuy,isStudent,type;

  if(token!=null){
    currentUser = true;  
    type = jwt_decode(token).type; //get type user 
  }    
  
  reqAuth     = to.meta.reqAuth; 
  isFamilyGuy = to.meta.isFamilyGuy;
  isStudent   = to.meta.isStudent;

  if(reqAuth){
    if(!currentUser){next('/login')}       //replace view login
    else{
      if(isFamilyGuy){        
        if(type==='familyGuy'){next()}
        else{next('/user')}               //replace view student
      }else if(isStudent){
        if(type==='student'){next()}
        else{next('/admin')}              //replace view family guy
      }else{
        next();
      }
    }
  }else if(currentUser){
    if(type==='familyGuy'){next('/admin')}    //replace view family guy
    if(type==='student'){next('/user')}       //replace view student
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
