import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateMeetup from "../views/Meetup/CreateMeetup";
import Meetups from "../views/Meetup/Meetups";
import Meetup from "../views/Meetup/Meetup";
import Profile from "../views/user/Profile";
import Signin from "../views/user/Signin";
import Signup from "../views/user/Signup";
import Auth from './auth';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter:Auth
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props:true,
    component: Meetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter:Auth
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
