<template>
  <div class="home">
    <input v-model="player">
    <br>
    <button @click="createRoom">create game</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data: function () {
    return {
      player: ''
    }
  },
  methods: {
    createRoom () {
      this.$store.dispatch('createRoom', this.player)
    }
    
  }
}
</script>
