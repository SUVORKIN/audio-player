<template>
  <div class="playlist text-xs-left">
    <div @click="$emit('changeTrack', index)" v-for="(track, index) in playlist" :key="track.name">
      <playlistItem
        :track="track"
        :isPlaying="isPlaying"
        :selectedTrackIndex="selectedTrackIndex"
        :selectedTrack="selectedTrack"
      />
    </div>
  </div>
</template>

<script>
import playlistItem from '@/components/playlistItem.vue'
export default {
  name: 'playlist',
  props: {
    playlist: Array,
    selectedTrackIndex: Number,
    isPlaying: Boolean,
    selectedTrack: Object
  },
  components: {
    playlistItem
  }
}
</script>
