<template>
  <div class="home mt-4">
      <!-- image -->
      <div class="container-keyboard">
        <img src="../assets/hands.gif" class="keyboard-img margin-right: 100px; " >
      </div>
      <!-- image -->
      <!-- daring message  -->

      <p class="detiled-text1" style="font-weight: bolder;">JANKENPON</p>
      <!-- <p class="detiled-text2"> *psst you will be our master </p> -->

      <!-- daring message  -->
      <b-button class="play-btn px-3 py-2 mt-3 btn-lg" type="submit" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">CREATE ROOM</b-button>
      <!-- input form  -->
      <div class="container">
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            <form @submit.prevent="createRoom()">
              <b-form-input class="text-center" v-model="username" placeholder="Enter your name"></b-form-input>
              <b-button class="play-btn px-3 py-2 mt-3 btn-lg" type="submit" pill>Go !</b-button>
            </form>
          </div>
        </div>
      </div>
      <!-- input form  -->
      <b-button @click="joinRoom" class="play-btn px-3 py-2 mt-3 btn-lg" type="submit">JOIN RANDOM ROOM</b-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    joinRoom () {
      this.$store.dispatch('readRoom')
    },
    createRoom () {
      if (this.username) {
        console.log('roomCreated', this.username)
        this.$store.dispatch('create', this.username)
      } else {
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
.container-keyboard {
  display: inline-block;
  background-repeat: no-repeat;
  /* background-image: url('../assets/orange.jpg'); */
  background-size: center;
  height: 20vh;
  width: 40vw;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 1vw;
  margin-bottom: 8vw;
}

.container {
  max-width: 250px;
}

.play-btn {
  background-color: #62B69B;
  border: none;
}

.keyboard-img{
  width: 250px;
  height: 250px;
}

@media screen and (min-width: 1500px) {
  .keyboard-img{
    width: 400px;
    height: 400px;
  }
}

@media screen and (min-width: 700px) {
  .detiled-text1{
    font-family: 'Quicksand', sans-serif;
    font-size: 30px;
    color: #444547;
    margin-top: 40px;
  }
  .detiled-text2{
    font-family: 'Quicksand', sans-serif;
    font-size: 15px;
    color: #444547
  }
}

@media screen and (min-width: 1800px) {
  .detiled-text1{
  font-family: 'Quicksand', sans-serif;
  font-size: 40px;
  color: #444547;
  margin-top: 110px;
  }
  .detiled-text2{
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  color: #444547
}
}

</style>
