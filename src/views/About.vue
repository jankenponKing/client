<template>
  <div class="about">
    <h1>This is an about page</h1>

    <label>Player 1</label>
    <input v-model="player1">
    <br>
    <label>Player 2</label>
    <input v-model="player2">
    <br>
    <button @click="getWinner">Play</button>
    <label>Winner</label>
    <input v-model="winner">
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      player1: '',
      player2: '',
      winner: ''
    }
  },
  methods: {
    getWinner () {
      if (this.player1 === 'batu' && this.player2 === 'gunting') this.winner = 'Player 1'
      else if (this.player1 === 'gunting' && this.player2 === 'kertas') this.winner = 'Player 1'
      else if (this.player1 === 'kertas' && this.player2 === 'batu') this.winner = 'Player 1'
      else if (this.player1 === this.player2) this.winner = 'Match'
      else this.winner = 'Player 2'
    }
  }
}
</script>

<style>

</style>
