<template>
  <div class="home">
    <player/>
  </div>
</template>

<script>
// @ is an alias to /src
import player from '@/components/player.vue'

export default {
  name: 'home',
  components: {
    player
  }
}
</script>
