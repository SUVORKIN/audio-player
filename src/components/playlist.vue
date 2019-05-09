<template>
  <div class="playlist">
    <div v-for="track in playlist" :key="track.id">{{track.name}}</div>
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
