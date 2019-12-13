<template>

</template>




<script>
export default {
  name: 'joinRoom',
  data: function(){
    return{
      formUserName: true,
      newUser: '',

    }
  },
  methods:{
    fetchData()
      {
        console.log('TCL \n============\n ', 'jalan nih fetch data')
        this.$store.dispatch('fetchData', this.$route.params.room)
      },
    userJoinRoom () 
      {
        console.log('TCL \n============\n ', this.newuser)
        this.$store.dispatch('addPlayer', { room: this.$route.params.room, newuser: this.newuser })
      },
    playNow () 
      {
        this.$store.dispatch('playNow', this.$route.params.room)
      }
  },
  created(){
    console.log('TCL \n============\n ', 'jalan nih created')
    this.fetchData()
  },
  computed: {
    getData () {
      const data = Object.values(this.$store.state.objectData)
      const arr = data.slice(2, data.length - 1)
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j].playerOrder > arr[i].playerOrder) {
            var tampung = arr[i]
            arr[i] = arr[j]
            arr[j] = tampung
          }
        }
      }
      return arr
    },
    getTotalPlayer () {
      return this.$store.state.objectData.player1.username
    },
    getUser () {
      return this.$store.state.username
    },
    startGame () {
      return this.$store.state.objectData.playStatus
    },
    getMaster () {
      return this.$store.state.master
    }
  },
  watch: {
    startGame (value) {
      if (value) {
        this.$router.push({ path: `/game/${this.$route.params.room}` })
      }
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData', this.$route.params.room)
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
