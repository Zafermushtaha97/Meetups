<template>
    <div>
            <v-card elevation="1">
                <v-toolbar  class="teal lighten-1"  dark>
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <router-link to="/" tag="span" style="cursor: pointer">MoriohMeetups</router-link>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn class="hidden-xs-only" text v-for="item in menuItems" :key="item.title" router :to="item.route">
                        <v-icon left dark>{{ item.icon }}</v-icon>
                      {{ item.title }}
                    </v-btn>
                    <v-btn text
                            v-if="userIsAuthenticated"
                             v-on:click="logout">
                        <v-icon left dark >mdi-exit-to-app</v-icon>
                        Logout

                    </v-btn>
                </v-toolbar>
            </v-card>
            <main>
                <router-view></router-view>
            </main>
            <v-navigation-drawer v-model="drawer" absolute temporary>
                <v-list>
                    <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.route">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="userIsAuthenticated" v-on:click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>LogOut</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        
    </div>
</template>
<script>

    export default {
        name: 'navbar',
        methods: {
            logout(){
                this.$store.dispatch('logout')
            }
        },
        data(){
            return{
                drawer: false,
                num:2,
                numm:8,


            }
        },

        computed: {
            menuItems () {
                let menuItems = [
                    {title: 'Sign up' , icon: 'mdi-account-edit-outline',route: '/Signup' },
                    { title: 'Sign in',icon: 'mdi-login',route: '/Signin' }
                ]
                if (this.userIsAuthenticated) {
                  //  console.log(this.$store.getters.users)
                    menuItems = [
                        {title:'MoriohMeetups',icon:'mdi-account-supervisor',route:'/meetups'},
                        {title:'Create Meetup',icon:'mdi-map-marker',route: '/new'},
                        { title: 'Profiles',icon: 'mdi-account-box',route: '/profile' },
                    ]
                }
                return menuItems

            },
            userIsAuthenticated(){
                return this.$store.getters.users !== null && this.$store.getters.users !== undefined

            },

        }

    };
</script>







