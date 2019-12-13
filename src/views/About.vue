<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div>
      <label>{{player1Name}}</label>
      <div :class='{chosen: player1 == "gunting"}' @click='playerOneChoose("gunting");'>Gunting</div>
      <div :class='{chosen: player1 == "batu"}' @click='playerOneChoose("batu")'>Batu</div>
      <div :class='{chosen: player1 == "kertas"}' @click='playerOneChoose("kertas")'>Kertas</div>
    </div>
    <br>
    <div v-if='finished'>
      <label>{{player2Name}}</label>
      <div :class='{chosen: player2 == "gunting"}' @click='playerTwoChoose("gunting")'>Gunting</div>
      <div :class='{chosen: player2 == "batu"}' @click='playerTwoChoose("batu")'>Batu</div>
      <div :class='{chosen: player2 == "kertas"}' @click='playerTwoChoose("kertas")'>Kertas</div>
    </div>
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
      player1Name: 'player #1',
      player2Name: 'player #2',
      winner: '',
      finished: ''
    }
  },
  methods: {
    getWinner () {
      if (this.player1 === 'batu' && this.player2 === 'gunting') this.winner = 'Player 1'
      else if (this.player1 === 'gunting' && this.player2 === 'kertas') this.winner = 'Player 1'
      else if (this.player1 === 'kertas' && this.player2 === 'batu') this.winner = 'Player 1'
      else if (this.player1 === this.player2) this.winner = 'Match'
      else this.winner = 'Player 2'
    },
    playerOneChoose(option){
      this.player1 = option
      if(this.player2 != ''){
        this.getWinner()
      }
    },
    playerTwoChoose(option){
      this.player2 = option
      if(this.player1 != ''){
        this.getWinner()
      }
    }
  }
}
</script>

<style scoped>
  .chosen{
    background-color: lightgreen;
    border: 1px solid black;
  }
</style>
