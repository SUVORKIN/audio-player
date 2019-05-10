<template>
  <div class="controls">
    <v-layout column>
      <v-flex class="mx-3">
        <v-layout>
          <v-flex class="text-xs-left">{{timePlayedConverted}}</v-flex>
          <v-flex class="text-xs-right">{{timeLeftConverted}}</v-flex>
        </v-layout>
        <v-slider
          class="controls_progress"
          color="grey"
          @change="$emit('seek', time)"
          v-model="time"
          :max="selectedTrack.duration"
          :min="start"
        ></v-slider>
      </v-flex>
      <v-flex>
        <span class="controls_track-name">{{selectedTrack.name}}</span>
      </v-flex>
      <v-flex>
        <span class="controls_track-artist red--text">{{selectedTrack.artist}}</span>
      </v-flex>
    </v-layout>
    <v-layout class="controls_buttons" justify-center align-center>
      <v-btn @click="$emit('prevTrack')" flat fab>
        <v-icon>fast_rewind</v-icon>
      </v-btn>
      <v-btn flat fab @click="$emit('play')">
        <v-icon v-if="isPlaying">pause</v-icon>
        <v-icon v-else>play_arrow</v-icon>
      </v-btn>
      <v-btn @click="$emit('nextTrack')" flat fab>
        <v-icon>fast_forward</v-icon>
      </v-btn>
    </v-layout>
    <v-layout>
      <v-flex class="mx-3">
        <v-layout align-center>
          <v-icon class="mb-1">volume_down</v-icon>

          <v-slider
            @change="updateVolume(volume)"
            class="mx-2"
            v-model="volume"
            :max="max"
            :min="min"
          ></v-slider>

          <v-icon class="mb-1">volume_up</v-icon>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'controls',
  data () {
    return {
      time: 0,
      start: 0,
      end: 100,
      volume: 100,
      max: 100,
      min: 0
    }
  },
  props: {
    selectedTrack: Object,
    isPlaying: {
      default: false,
      type: Boolean
    },
    timePlayed: Number
  },
  watch: {
    timePlayed (val) {
      this.time = val
    }
  },
  computed: {
    timePlayedConverted () {
      return this.convertTimeHHMMSS(this.time)
    },
    timeLeftConverted () {
      return this.convertTimeHHMMSS(this.selectedTrack.duration - this.time)
    }
  },
  methods: {
    updateVolume (val) {
      this.$store.dispatch('updateVolume', val / 100)
    },
    convertTimeHHMMSS (val) {
      if (!val) {
        return '00:00'
      } else {
        let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
        return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
      }
    }
  }
}
</script>

<style>
.controls_track-name {
  font-weight: bold;
  font-size: 22px;
}
.controls_buttons {
  font-size: 22px;
}
.controls_progress {
  margin-top: 0 !important;
}
</style>
