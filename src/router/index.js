import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import StyleGuide from "@/components/StyleGuide";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard,

      children: [
        {
          path: "StyleGuide",
          name: "StyleGuide",
          component: StyleGuide,
        }
      ]
    }
  ]
});
