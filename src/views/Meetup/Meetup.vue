<template v-slot:activator="{ on }">
  <v-container class="mt-4">
      <v-layout row wrap>
          <v-flex xs12 >
            <v-card>
                <v-card-title>
                    <h4 class="display-1 light-blue--text darken-4--text">{{meetup.title}}</h4>    
                    <template v-if="UserCreator">
                        <v-spacer></v-spacer>
                        <edit-meetup :meetup='meetup'></edit-meetup>
                    </template>
                </v-card-title>
                 <v-img class="ma-8"
                 :src="meetup.imageUrl"
                     height="400px"
          ></v-img>
                <v-card-text>
                    <div class="blue--text darken-2--text">{{meetup.date | date}}- {{ meetup.location }}</div>
                    <div class="my-4"> 
                        <edit-date :meetup='meetup' v-if="UserCreator"></edit-date>

                        <edit-time-meetup :meetup='meetup' v-if="UserCreator" ></edit-time-meetup>
                    </div>
                    <div class="subtitle-1">
                        {{meetup.description}} 
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <register-dialog :meetupId="meetup.id" v-if="UserIsAuthenticated && !UserCreator"></register-dialog>
                </v-card-actions>
            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "Meetup",
        props:['id'],
        computed: {
            meetup () {
                return this.$store.getters.LoadedMeetup(this.id) || {}
            },
            UserIsAuthenticated(){
                return this.$store.getters.users !== null && this.$store.getters.users !== undefined            
                },
            UserCreator(){
                if(!this.UserIsAuthenticated){
                    return false
                }
                return this.$store.getters.users.id === this.meetup.createrid     
            }
        }
    }
</script>

<style scoped>

</style>