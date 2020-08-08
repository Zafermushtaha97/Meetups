<!--<template>-->
<!--  <div>-->
<!--    <v-app>-->
<!--      <v-card>-->
<!--        <v-toolbar app class="red accent-3"  dark>-->
<!--          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
<!--          <v-toolbar-title>MeetUp-->
<!--          </v-toolbar-title>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn class="hidden-xs-only"-->
<!--                 text-->
<!--                 v-for="item in menuitems"-->
<!--                 :key="item.title"-->
<!--          >-->
<!--            <v-icon left dark>{{ item.icon }}</v-icon>-->
<!--            {{ item.title }}-->
<!--          </v-btn>-->
<!--        </v-toolbar>-->
<!--      </v-card>-->

<!--      <main>-->
<!--        <router-view></router-view>-->
<!--      </main>-->
<!--    <v-navigation-drawer v-model="drawer" absolute temporary>-->
<!--      <v-list>-->
<!--        <v-list-item v-for="item in menuitems"-->
<!--                     :key="item.title">-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>{{ item.icon }}</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
<!--    </v-app>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->

<!--  export default {-->
<!--    name: 'navbar',-->
<!--    components: {-->
<!--    },-->
<!--    data(){-->
<!--      return{-->
<!--        drawer: false,-->
<!--        menuitems:[-->
<!--          {title:'View Meetup',icon:'mdi-account-supervisor'},-->
<!--          {title:'Organize Meetups',icon:'mdi-map-marker'},-->
<!--          { title: 'Profile',icon: 'mdi-account-box' },-->
<!--          {title: 'Sign up' , icon: 'mdi-account-edit-outline' },-->
<!--          { title: 'Sign in',icon: 'mdi-login' }-->


<!--        ]-->

<!--      }-->
<!--    },-->
<!--  };-->
<!--</script>-->




<template>
  <v-app>
    <Navbar/>
<!--      <router-view></router-view>-->
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar'
  export default {
    name: 'App',

    components: {
      Navbar

    },

    data: () => ({
      //
    }),
  };
</script>


