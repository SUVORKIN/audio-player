<template>
  <div class="player">
    <v-card flat>
      <v-layout justify-center column>
        <v-flex class="pa-4">
          <v-img class="player_track-artwork" max-width="500px" :src="selectedTrack.artwork"></v-img>
        </v-flex>
        <controls
          :timePlayed="timePlayed"
          :isPlaying="isPlaying"
          :selectedTrack="selectedTrack"
          @seek="seek"
          @play="play(selectedTrackIndex)"
          @nextTrack="changeTrack(selectedTrackIndex + 1)"
          @prevTrack="changeTrack(selectedTrackIndex - 1)"
        />
        <v-divider></v-divider>
        <playlist
          :isPlaying="isPlaying"
          :selectedTrackIndex="selectedTrackIndex"
          :playlist="playlist"
          @changeTrack="changeTrack"
        />
      </v-layout>
    </v-card>
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
      ]
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
    }
  },
  computed: {
    volume () {
      return this.$store.getters.volume
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
      if (i > this.playlist.length - 1 || i < 0) {
        i = 0
      }
      if (this.playlist[i].name === this.selectedTrack.name) {
        this.selectedTrackAudio.pause()
      } else {
        this.timePlayed = 0
        this.selectedTrackAudio.pause()
        this.isPlaying = !this.isPlaying
      }
      this.play(i)
    },
    play (i = 0) {
      if (!this.isPlaying) {
        this.isPlaying = true
        this.selectedTrackIndex = i
        this.selectedTrack = this.playlist[i]
        this.selectedTrackAudio = new Audio(this.playlist[i].src)
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
      if (this.selectedTrackIndex >= this.playlist.length - 1) {
        this.changeTrack()
      } else {
        this.changeTrack(this.selectedTrackIndex + 1)
      }
    },
    convertTimeHHMMSS (val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
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
