<template>
  <v-card class="playlist_item" flat>
    <v-card-text :class="{'selected': isSelected}" class="px-3">
      <v-layout align-center>
        <span class="mr-2">
          <v-img class="player_track-artwork" width="50px" :src="track.artwork"></v-img>
        </span>
        <v-flex>
          <div>{{track.name}}</div>
          <div class="caption">{{track.artist}}</div>
        </v-flex>
        <v-flex class="text-xs-right" v-if="isSelected && isPlaying" xs1 shrink>
          <v-icon>play_arrow</v-icon>
        </v-flex>
        <v-flex class="caption text-xs-right" xs1>{{track.durationConverted}}</v-flex>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: 'playlistItem',
  props: {
    track: Object,
    isPlaying: Boolean,
    selectedTrackIndex: Number,
    selectedTrack: Object
  },
  computed: {
    isSelected () {
      return this.selectedTrack.name === this.track.name
    }
  }
}
</script>

<style>
.playlist_item {
  cursor: pointer;
}
.selected {
  background-color: rgb(255, 230, 230) !important;
}
</style>
