import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from './store'
import DateFilter from './filter/date'
import * as firebase from "firebase";
import Alert from './components/alert.vue'
import EditMeetup from '@/views/Meetup/EditMeetup'
import EditDate from '@/views/Meetup/EditMeetupDate'
import EditTimeMeetup from '@/views/Meetup/EditTimeMeetup'
import RegisterDialog from '@/views/Meetup/Registeration/RegisterDialog'


Vue.config.productionTip = false
Vue.filter('date',DateFilter)
Vue.component('app-alert', Alert)
Vue.component('edit-meetup',EditMeetup)
Vue.component('edit-date',EditDate)
Vue.component('edit-time-meetup',EditTimeMeetup)
Vue.component('register-dialog',RegisterDialog)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBDWhyqjPX0OZE1coIWPgChlYphCU4785k",
      authDomain: "devmeetups-d6f7c.firebaseapp.com",
      databaseURL: "https://devmeetups-d6f7c.firebaseio.com",
      projectId: "devmeetups-d6f7c",
      storageBucket: "gs://devmeetups-d6f7c.appspot.com"
    })
    firebase.auth().onAuthStateChanged((users) => {
      if(users){
        this.$store.dispatch('autoSignIn',users)
        this.$store.dispatch('fetchUserdata')
      }
    })
    this.$store.dispatch('loadMeetups')
  }

}).$mount('#app')
