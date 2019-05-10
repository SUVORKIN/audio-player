<template>
  <div class="player">
    <v-container>
      <v-card flat>
        <v-layout justify-center align-canter wrap>
          <v-flex lg3 sm12 xs12 class="pa-4">
            <v-img class="player_track-artwork" max-width="400px" :src="selectedTrack.artwork"></v-img>
          </v-flex>
          <v-flex xs12 lg9>
            <controls
              :timePlayed="timePlayed"
              :isPlaying="isPlaying"
              :selectedTrack="selectedTrack"
              @seek="seek"
              @play="play(selectedTrackIndex)"
              @nextTrack="changeTrack(selectedTrackIndex + 1)"
              @prevTrack="changeTrack(selectedTrackIndex - 1)"
            />
          </v-flex>
          <v-divider></v-divider>
          <v-flex lg12 xs12>
            <div class="my-2">
              <v-text-field color="grey" box v-model="query" hide-details label="Type name"></v-text-field>
              <div>{{filterMsg}}</div>
            </div>

            <playlist
              :isPlaying="isPlaying"
              :selectedTrackIndex="selectedTrackIndex"
              :playlist="playlistFiltered"
              @changeTrack="changeTrack"
            />
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import playlist from '@/components/playlist.vue'
import controls from '@/components/controls.vue'
export default {
  name: 'player',
  data () {
    return {
      isPlaying: false,
      selectedTrack: null,
      timePlayed: 0,
      selectedTrackAudio: null,
      selectedTrackIndex: 0,
      playlist: [
        {
          name: 'Honor Him (OST Gladiator)', artist: 'Hanz Zimmer', src: require('@/tracks/gladiator_16 - Honor Him.mp3'), type: 'audio/mpeg', artwork: require('@/tracks/artworks/87380.jpg')
        },
        {
          name: 'Call of Magic (OST TES Morrowind)', artist: 'Jeremy Soule', src: require('@/tracks/call-of-magic-ost-morrowind.mp3'), type: 'audio/mpeg', artwork: require('@/tracks/artworks/Morrowind_ost_cover.jpg')
        },
        {
          name: 'Beverly Hills Cop OST', artist: 'JAxel F - Harold Faltermeyer', src: require('@/tracks/axel-f-ost-beverly-hills-cop.mp3'), type: 'audio/mpeg', artwork: require('@/tracks/artworks/115488103.jpg')
        }
      ],
      filterMsg: '',
      query: '',
      matchedTracks: []
    }
  },
  created () {
    this.selectedTrackAudio = new Audio(this.playlist[0].src)
    this.selectedTrack = this.playlist[0]
  },
  mounted () {
    for (let i in this.playlist) {
      let audio = new Audio(this.playlist[i].src)
      audio.addEventListener('loadedmetadata', () => {
        this.$set(this.playlist[i], 'duration', audio.duration)
        this.$set(this.playlist[i], 'durationConverted', this.convertTimeHHMMSS(audio.duration))
      })
    }
    this.selectedTrackAudio.addEventListener('timeupdate', this.updateTime)
    this.selectedTrackAudio.onended = () => {
      this.onTrackEnd()
    }
  },
  watch: {
    volume (val) {
      this.selectedTrackAudio.volume = val
    },
    query (val) {
      this.filter(val)
    }
  },
  computed: {
    volume () {
      return this.$store.getters.volume
    },
    playlistFiltered () {
      return this.query ? this.matchedTracks : this.playlist
    }
  },
  methods: {
    updateTime () {
      this.timePlayed = parseInt(this.selectedTrackAudio.currentTime)
    },
    seek (timeMark) {
      this.selectedTrackAudio.currentTime = timeMark
    },
    changeTrack (i = 0) {
      if (i > this.playlistFiltered.length - 1 || i < 0) {
        i = 0
      }
      if (this.playlistFiltered[i].name === this.selectedTrack.name) {
        this.selectedTrackAudio.pause()
      } else {
        this.timePlayed = 0
        this.selectedTrackAudio.pause()
        this.isPlaying = false
        this.selectedTrackIndex = i
        this.selectedTrack = this.playlistFiltered[i]
      }
      this.play(i)
    },
    play (i = 0) {
      if (!this.isPlaying) {
        this.isPlaying = true
        this.selectedTrack = this.playlistFiltered[i]
        this.selectedTrackAudio = new Audio(this.playlistFiltered[i].src)
        this.selectedTrackAudio.volume = this.volume
        this.selectedTrackAudio.currentTime = this.timePlayed
        this.selectedTrackAudio.play()
        this.selectedTrackAudio.addEventListener('timeupdate', this.updateTime)
        this.selectedTrackAudio.onended = () => {
          this.onTrackEnd()
        }
      } else {
        this.isPlaying = false
        this.selectedTrackAudio.pause()
      }
    },
    onTrackEnd () {
      if (this.selectedTrackIndex >= this.playlistFiltered.length - 1) {
        this.changeTrack()
      } else {
        this.changeTrack(this.selectedTrackIndex + 1)
      }
    },
    convertTimeHHMMSS (val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
    },
    filter (string) {
      const matched = this.playlist.filter(item => item.name.toLowerCase().indexOf(string.toLowerCase()) > -1)
      if (!matched.length) {
        this.filterMsg = 'There are no matches'
      } else {
        this.filterMsg = ''
      }
      this.matchedTracks = matched
    }
  },
  components: {
    playlist,
    controls
  }
}
</script>

<style>
.player_track-artwork {
  margin: auto;
  border-radius: 5px;
  box-shadow: 0px 12px 20px 0px rgba(118, 118, 118, 0.5);
}
</style>
