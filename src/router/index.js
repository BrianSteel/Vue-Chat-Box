import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Chat from '@/views/Chat.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path:'/chat',
    name: 'chat',
    component: Chat,
    //so that you can pass pass props through component connected through routes
    props: true, 
    //route guard blocks according to the condition: if name string on welcome page exists or not
    //beforeEnter is functions that guard from entering a route
    //to (paramter) = component we are going to: chat
    //from (parameter)= component where we are going from: welcome
    //next (function)= function to where we are going next component
    beforeEnter: (to, from, next) => {
      if (to.params.name){
        //goes to the next component
        next();
      }else{
        //redirects back to the same component: welcome component
        next({name: 'Welcome'}) 
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
