<template>
<v-dialog width="350px"   v-model="editDialog">
    <template v-slot:activator="{ on }">
    <v-btn  accent v-on="on" @click.stop="editDialog=true">
       Edit Date
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Post Date
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-date-picker v-model="editabledate" full-width actions>
                        <template>
                           <v-btn text class="blue--text" @click.native="onSaveChanges()" >save

                           </v-btn>
                            <v-btn text class="blue--text" @click.native="editDialog = false" >Close

                            </v-btn>
                        </template>
                    </v-date-picker>
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
            editabledate:null         
        }
    },
    methods:{
        onSaveChanges(){
            const newdate  = new Date(this.meetup.date)
            const newday  = new Date(this.editabledate).getUTCDate()
            const newmonth  = new Date(this.editabledate).getUTCMonth()
            const newyear  = new Date(this.editabledate).getUTCFullYear()
            newdate.setUTCDate(newday)
            newdate.setUTCMonth(newmonth)
            newdate.setUTCFullYear(newyear)
            this.$store.dispatch('UpdateMeetup',{
                id:this.meetup.id,
                date:newdate
            })
            return this.editDialog = false

            
        }

    },
    created(){
        this.editabledate =new Date(this.meetup.date).toISOString().substr(0, 10)
       
    }
}
</script>