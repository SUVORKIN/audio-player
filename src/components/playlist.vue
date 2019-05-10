<template>
  <div class="playlist text-xs-left">
    <v-card
      class="playlist_item"
      :class="{'active': index == selectedTrackIndex}"
      flat
      v-for="(track, index) in playlist"
      :key="track.id"
      @click="$emit('changeTrack', index)"
    >
      <v-card-text class="px-2">
        <v-layout align-center>
          <span class="mr-2">
            <v-img class="player_track-artwork" width="50px" :src="track.artwork"></v-img>
          </span>
          <v-flex>
            <div>{{track.name}}</div>
            <div class="caption">{{track.artist}}</div>
          </v-flex>
          <v-flex xs1>
            <v-icon color="red" v-if="isPlaying && selectedTrackIndex == index">play_arrow</v-icon>
          </v-flex>
          <v-flex class="caption" xs1>{{track.durationConverted}}</v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  props: {
    playlist: Array,
    selectedTrackIndex: Number,
    isPlaying: Boolean
  }
}
</script>

<style>
.playlist_item {
  cursor: pointer;
}
.active {
  background-color: rgb(255, 230, 230) !important;
}
</style>
