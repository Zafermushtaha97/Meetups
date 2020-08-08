<template>
   <v-container class="my-8">
       <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mt-5 ">
           <v-flex xs12>
               <v-card class="light-blue">
                   <v-container fluid>
                       <v-layout row>
                           <v-flex xs5 sm4 md3 class="text-center">
                               <v-avatar size="140">
                               <v-img
                             :src="meetup.imageUrl"
                             height="130px"
                             class = "ma-3"
                             mandatory
                            ></v-img>
                            </v-avatar>
                           </v-flex>
                           <v-flex xs7 sm8 md9>
                               <v-card-title>
                                   <div>
                                   <h5 class="white--text mb-0 display-1">{{ meetup.title }}</h5>
                                   <div class="font-weight-light body-2">{{ meetup.date | date}}</div>
                                   </div>
                               </v-card-title>
                               <v-card-actions>
                                   <v-btn :to="'/meetups/' + meetup.id">
                                       <v-icon left light>mdi-arrow-right</v-icon>View  Meetups</v-btn>
                               </v-card-actions>
                           </v-flex>
                       </v-layout>
                   </v-container>
               </v-card>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
    export default {
        name: "Meetups",
        computed:{
            meetups () {
                return this.$store.getters.LoadedMeetups
            }
        },
        methods:{
           
        }
    }
</script>

<style scoped>

</style>