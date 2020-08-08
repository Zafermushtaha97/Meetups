<template v-slot:activator="{ on }">
    <v-container class="ml-4">
        <v-layout row>
            <v-flex xs12 class="mt-5" offset-sm3>
                <h5 class="blue--text darken-2--text display-2 font-weight-light">Create a new Meetup</h5>
            </v-flex>
        </v-layout>
        <v-layout row class="mt-5">
            <v-flex xs12>
                <v-form @submit.prevent="onCreateMeetup">
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="title" v-model="title" id="title" label="Title" Required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field name="location" v-model="location" id="location" label="Location" Required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn  @click="onPickFile" class="blue darken-2" dark>Upload Image</v-btn>
                            <input type="file" ref="fileInput" @change="onFilePicked"
                                   class="d-none" accept="image/*"> <!--accept all type of img-->
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea name="description" v-model="description" id="description" label="Description" Required></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Data & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <template>
                                <v-date-picker v-model="date"></v-date-picker>
                            </template>

                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-3">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" class="blue accent-2 white--text "  :disabled="!formIsValid">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: new Date().toISOString().substr(0, 10),
                time: new Date(),
                image: null,
                
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.imageUrl !== '' &&
                    this.description !== ''
            },
            submittableDateTime () {
                const date = new Date(this.date)
                if (typeof this.time === 'string') {
                    let hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return date
            }
        },
        methods: {
            onCreateMeetup () {
                if (!this.formIsValid) {
                    return
                }
                if (!this.image) {
                    return
                }
                const meetupData = {
                    title: this.title,
                    location: this.location,
                    image: this.image,
                    description: this.description,
                    date: this.submittableDateTime,
                    
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            },
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const files = event.target.files
                let filename = files[0].name
                if (filename.lastIndexOf('.') <= 0) {
                 return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                 this.imageUrl = fileReader.result
                   
                })
                fileReader.readAsDataURL(files[0])
                 this.image = files[0]
              
               
            }
        }
    }
</script>

<style scoped>

</style>