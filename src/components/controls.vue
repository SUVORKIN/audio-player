<template>
  <div class="controls">
    <v-layout column>
      <v-flex class="mx-3">
        <v-layout>
          <v-flex class="text-xs-left">3:05</v-flex>
          <v-flex class="text-xs-right">1:11</v-flex>
        </v-layout>
        <v-slider class="controls_progress" color="grey" v-model="progress" :max="end" :min="start"></v-slider>
      </v-flex>
      <v-flex>
        <span class="controls_track-name">{{selectedTrack.name}}</span>
      </v-flex>
      <v-flex>
        <span class="controls_track-artist red--text">{{selectedTrack.artist}}</span>
      </v-flex>
    </v-layout>

    <v-layout class="controls_buttons" justify-center align-center>
      <v-btn flat fab>
        <v-icon>fast_rewind</v-icon>
      </v-btn>
      <v-btn flat fab @click="$emit('play')">
        <v-icon v-if="isPlaying">pause</v-icon>
        <v-icon v-else>play_arrow</v-icon>
      </v-btn>
      <v-btn flat fab>
        <v-icon>fast_forward</v-icon>
      </v-btn>
    </v-layout>
    <v-layout>
      <v-flex class="mx-3">
        <v-layout align-center>
          <v-icon class="mb-1">volume_down</v-icon>
          <v-slider class="mx-2" v-model="volume" :max="max" :min="min"></v-slider>
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
      progress: 100,
      start: 0,
      end: 100,
      volume: 30,
      max: 100,
      min: 0
    }
  },
  props: {
    selectedTrack: Object,
    isPlaying: {
      default: false,
      type: Boolean
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
