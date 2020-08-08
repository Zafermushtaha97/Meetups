<template >
<v-dialog width="350px"   v-model="editDialog">
    <template v-slot:activator="{ on }">
    <v-btn  accent v-on="on" @click.stop="editDialog=true" class="ml-4">
       Edit Time
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Post Time
                        {{editabletime}}
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-time-picker v-model="editabletime" full-width actions format="24hr">
                        <template>
                           <v-btn text class="blue--text" @click.native="onSaveChanges()" >save

                           </v-btn>
                            <v-btn text class="blue--text" @click.native="editDialog = false" >Close

                            </v-btn>
                        </template>
                    </v-time-picker>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>
</template>


<script>
export default {
    props:['meetup'],
    data() {
        return {
            editDialog:false,
            editabletime:null         
        }
    },
    methods:{
        onSaveChanges(){
            const newdate  = new Date(this.meetup.date)
            const hours = this.editabletime.match(/^(\d+)/)[1]
            const minutes = this.editabletime.match(/:(\d+)/)[1]
            newdate.setHours(hours)
            newdate.setMinutes(minutes)
            this.$store.dispatch('UpdateMeetup',{
                id:this.meetup.id,
                date:newdate
            })
            return this.editDialog = false
            
        }

    },
    created(){
        this.editabletime =new Date(this.meetup.date).toTimeString().substr(0, 9)
       
    }
}
</script>