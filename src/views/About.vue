<template>
  <b-container class="p-3" style="background-color: white;">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <h1 class="welcome-title" style="font-weight: bolder;">JANKENPON MATCH</h1>
    <div class="d-flex justify-content-between">
    <img v-if="playerOneReady" src="http://forums.gcmadness.com/uploads/monthly_2018_08/333dd5de0aaa43e8c318401a5481d691.thumb.gif.b76c523088c8ba9a2ade7793398069e9.gif" alt="icon">
    <img v-if="!playerOneReady" src="https://steamuserimages-a.akamaihd.net/ugc/186171913179629621/5D03574B8C67C4708310963A6EE4D784307165F3/" alt="icon">
    <img v-if="!getUser" style="width:30%" class="mr-5" src="https://media1.tenor.com/images/3a0c9909b542717ce9f651d07c4d4592/tenor.gif?itemid=8985245" alt="waiting">
    <img v-if="!playerTwoReady" v-show="getUser" src="https://i.imgur.com/GcDa7fw.gif" alt="icon">
    <img v-if="playerTwoReady" src="https://i.imgur.com/XB3llfc.gif" alt="icon">
    </div>
    <div class="row mt-5">
      <div class="col-4 d-flex flex-row">
        <button type="button" class="btn btn-secondary focus">
          ROOM MASTER
        </button>
        <div>
          <button type="button" class="btn btn-success ml-3">
            {{ getData[0].username }}
          </button>
      </div>
        </div>
      <div class="col-4">
        <button v-if="playerOneReady" @click="playerReady1" type="button" class="btn mr-3 btn-primary disabled">
          <i class="fas fa-check"></i>
          ready
        </button>
        <button v-if="!playerOneReady" @click="playerReady1" type="button" class="btn mr-3 btn-primary">
          <i class="fas fa-check"></i>
          ready
        </button>
        <button type="button" v-if="!playerTwoReady || !playerOneReady" class="btn btn-secondary disabled">PLAY !</button>
        <button type="button" class="btn btn-success" v-if="playerTwoReady && playerOneReady">PLAY !</button>
        <div v-if="getUser">
          <button v-if="playerTwoReady" @click="playerReady2" type="button" class="btn ml-3 btn-primary disabled">
            <i class="fas fa-check"></i>
            ready
          </button>
          <button v-if="!playerTwoReady" @click="playerReady2" type="button" class="btn ml-3 btn-primary">
            <i class="fas fa-check"></i>
            ready
          </button>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-end">
        <!-- {{ getData.length }} -->
        <button v-if="getData.length == 2" type="button" class="btn btn-success">
          {{ getData[1].username }}
        </button>
        <button v-if="getUser" type="button" class="btn btn-secondary ml-3">
          PENANTANG
        </button>
      </div>
      <div>
        <b-modal ref="modals" id="modal-center" centered title="BootstrapVue">
          <p class="my-4">Vertically centered modal!</p>
        </b-modal>
      </div>
    </div>
  </b-container>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      formusername: true,
      newuser: '',
      playerOneReady: false,
      playerTwoReady: false
    }
  },
  computed: {
    getData () {
      const data = Object.values(this.$store.state.objectData)
      const arr = data.slice(1)
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j].playerOrder > arr[i].playerOrder) {
            var tampung = arr[i]
            arr[i] = arr[j]
            arr[j] = tampung
          }
        }
      }
      console.log(arr)
      return arr
    },
    getTotalPlayer () {
      return this.$store.state.objectData.count
    },
    getUser () {
      return this.$store.state.username
    },
    startGame () {
      return this.$store.state.objectData.playStatus
    },
    getMaster () {
      if (localStorage.player == 1) return true
      else return false
    }
    // startGame () {
    //   return this.$store.state.objectData.playStatus
    // }
  },
  watch: {
    startGame (value) {
      if (value) {
        this.$router.push({ path: `/game/${this.$route.params.room}` })
      }
    }
  },
  methods: {
    playerReady1 () {
      this.playerOneReady ? this.playerOneReady = false : this.playerOneReady = true
    },
    playerReady2 () {
      this.playerTwoReady ? this.playerTwoReady = false : this.playerTwoReady = true
    },
    fetchData () {
      this.$store.dispatch('fetchUser', this.$route.params.room)
    },
    userJoinRoom () {
      this.$store.dispatch('addPlayer', { room: this.$route.params.room, newuser: this.newuser })
    },
    playNow () {
      this.$store.dispatch('playNow', this.$route.params.room)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
  .welcome-title{
    font-family: 'Quicksand', sans-serif;
  }
  .background-color-XXX{
    background-color: #62B69B;
  }
</style>
