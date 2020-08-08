<template>
  <v-container>
    <v-layout row wrap class="mt-4">
      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
      <v-btn large  to="/meetups" class="teal lighten-1 " dark>Explore Meetup</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-center">
      <v-btn large  to="/new" class="teal lighten-1 " dark>Orgaanize Meetups</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-center">
        <v-progress-circular
                indeterminate
                class="teal--text darken-2--text"
                :width="7"
                :size="70"
                v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5" v-if ="!loading">
      <v-flex xs12>
        <v-card  elevation="4"
                 max-width="70%"
                 class="mx-auto">
        <v-carousel>
          <v-carousel-item class="text-center"
                  v-for="meetup in meetups"
                  :src="meetup.imageUrl"
                  :key="meetup.id"
                  @click="onloadmeetup(meetup.id)">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4">
      <v-flex xs12 class="text-center">
        <p class="subtitle-1">Join our someone Meetups now!</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex>
        <Textinformation></Textinformation>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Textinformation from '@/components/Text_information'
export default {
  name: 'Home',
  components: {
    Textinformation
  },
  // data(){
  //   return{
  //     meetups: [
  //
  //       {
  //         src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  //         id: '45kjmnnndadfaadfa323', title: 'Meetup in Hong Kong'
  //       },
  //
  //       {
  //         src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  //         id: 'afajfjhuuuggd54545a323', title: 'Meetup in Moscow'
  //       },
  //       { src: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg', id: 'afajfjadfaadfa323', title: 'Meetup in New York' },
  //       { src: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg', id: 'aadsfhbkhlk1241', title: 'Meetup in Paris' }
  //     ],
  //   }
  // },

  computed:{
    meetups () {
      return this.$store.getters.featuredMeetup
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods:{
    onloadmeetup(id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>
<style scoped>
  .title {
    position: absolute;
    width: 30%;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
    margin-left: 35%;
  }
</style>