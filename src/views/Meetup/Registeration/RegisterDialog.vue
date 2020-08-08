<template>
<v-dialog width="350px"   v-model="editDialogregister">
    <template v-slot:activator="{ on }">
    <v-btn  accent v-on="on"  @click.stop="editDialogregister=true">
       {{UserIsRegisterd ? 'UnRegister' : 'Register'}}
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title v-if="UserIsRegisterd">Unregister from Meetup?</v-card-title>
                    <v-card-title v-else>Register for Meetup?</v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                  <v-card-text>you can write heere</v-card-text>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12> 
                  <v-card-actions>
                      <v-btn class="blue--text darken-1 " text
                        @click="editDialogregister = false">Cancel</v-btn>
                      <v-btn class="green--text darken-2"  @click="AgreeRegister" text="">Save</v-btn>
                  </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>
</template>


<script>
export default {
    props:['meetupId'],
    data() {
        return {
            editDialogregister:false
                   
        }
    },
    computed:{
        UserIsRegisterd(){
        return this.$store.getters.users.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods:{
        AgreeRegister(){
            if(this.UserIsRegisterd){
                this.$store.dispatch('UnRegisterUserMeetups', this.meetupId)
                this.editDialogregister = false
            }else{
                this.$store.dispatch('RegisterUserMeetups', this.meetupId)
                this.editDialogregister = false
            }
            
        }
    }

}
</script>