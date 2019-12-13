<template>
    <div style="text-align: center; font-family: 'Domine', serif;">
        <h1>Game Result</h1>
        <div class="result" v-for="(player, index) in players" :key="player.id">
        <div class="alert alert-warning alert-dismissible fade show result text-center py-3 px-4 mb-1" >
            <p class="mb-0">
            {{ index+1 }}. {{ player.username }} <b> <span style="color: #fff3cd"> 00 </span> </b> {{ player.wpm.toFixed(2) }} wpm
            </p>
        </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Result',
  computed: {
    players () {
      let player = []
      const data = Object.values(this.$store.state.objectData)
      const arr = data.slice(2, data.length - 1)
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j].wpm > arr[i].wpm) { // untuk mengurutkan dari kecil ke besar, jika ingin mengurutkan dari besar ke kecil maka ganti < menjadi >
            var tampung = arr[i]
            arr[i] = arr[j]
            arr[j] = tampung
          }
        }
      }
      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style  lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Domine&display=swap');
    .result {
        display: flex;
        justify-content: center;
    }

</style>
