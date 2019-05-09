<template>
  <v-container>
    <div class="player">
      <v-layout justify-center>
        <v-card flat>
          <v-flex class="pa-4">
            <v-img
              class="player_track-image"
              width="500px"
              :src="selectedTrack.image"
              aspect-ratio="1.6"
            ></v-img>
          </v-flex>
          <controls :selectedTrack="selectedTrack" @play="play"/>
          <v-divider></v-divider>
          <playlist :playlist="playlist"/>
        </v-card>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import playlist from '@/components/playlist.vue'
import controls from '@/components/controls.vue'
export default {
  name: 'player',
  data () {
    return {
      isPlaying: false,
      playlist: [
        {
          name: 'Ландыши', artist: 'DJ Someone', src: '/media/Landishy.99963f51.mp3', type: 'audio/mpeg', image: '/img/download.cebeaea9.jpeg'
        },
        {
          name: 'Ландыши2', src: '/media/Landishy.99963f51.mp3', type: 'audio/mpeg', image: ''
        }
      ]
    }
  },
  watch: {
    isPlaying (val) {
      this.play()
    }
  },
  computed: {
    selectedTrack () {
      return this.playlist[0]
    }
  },
  methods: {
    play () {
      var song = new Audio(this.selectedTrack.src)
      if (this.isPlaying) {
        song.pause()
      } else {
        var playPromise = song.play()
        if (playPromise !== undefined) {
          playPromise.then(function () {
            song.play()
          }).catch(function (error) {
            alert(error)
          })
        }
      }
    }
    // pause () {
    //   debugger
    //   var song = new Audio('http://localhost:8080/media/Landishy.99963f51.mp3')
    //   song.pause()
    //   // if (playPromise !== undefined) {
    //   //   playPromise.then(function () {
    //   //     song.pause()
    //   //   }).catch(function (error) {
    //   //     alert(error)
    //   //   })
    //   // }
    // }
  },
  components: {
    playlist,
    controls
  }
}
</script>

<style>
.player_track-image {
  border-radius: 5px;
  box-shadow: 0px 12px 20px 0px rgba(118, 118, 118, 0.5);
}
</style>
