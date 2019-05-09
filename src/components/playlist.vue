<template>
  <div class="playlist text-xs-left">
    <v-card class="mx-3" flat v-for="(track, index) in playlist" :key="track.id">
      <v-card-text>
        <v-layout align-center>
          <span class="mr-3">{{index}}</span>
          <v-flex>
            <div>{{track.name}}</div>
            <div>{{track.artist}}</div>
          </v-flex>
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
    playlist: Array
  }
}
</script>
