<template>
<v-dialog width="350px" v-model="dialog">
    <template v-slot:activator="{ on }">
    <v-btn fab accent  v-on="on" @click.stop="dialog=true">
        <v-icon>mdi-playlist-edit</v-icon>
    </v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>
                        Edit Post
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12> 
                    <v-card-text>
                            <v-text-field name="title" v-model="editedtitle" id="title" label="Title"
                          
                            Required></v-text-field>
                             <v-textarea name="description" v-model="editeddescription" id="description" label="Description" Required></v-textarea>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn text class="blue--text" @click="onsavechange()" >Save</v-btn>
                        <v-btn text class="blue--text" @click.stop="dialog=false">Close</v-btn>

                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    
</v-dialog>
    
</template>

<script>
export default {
    props:['meetup'],
    data(){
        return{
            dialog:false,
            editedtitle:this.meetup.title,
            editeddescription:this.meetup.description
        }
    },
    methods: {
        onsavechange(){
            if(this.editedtitle.trim()=== '' || this.editeddescription.trim() === ''){
                return
            }
            this.dialog = false
            this.$store.dispatch('UpdateMeetup',{
                id:this.meetup.id,
                title:this.editedtitle,
                description:this.editeddescription
            })
        }
    },
    
}
</script>