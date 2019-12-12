import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerCount: 0,
    player: '',
    roomId: ''
  },
  mutations: {
    addPlayer (state, { payload }) {
      this.state.playerCount++
      this.state.player = {
        [`name${this.state.playerCount}`]: payload
      }
      console.log(this.state)
    }
  },
  actions: {
    createRoom ({ commit }, payload) {
      commit('addPlayer', { payload })
      // db.colllection('room').add({
      //   playerCount: this.playerCount,
      //   player: this.player
      // })
      //   .then((docRef) => {
      //     this.roomId = docRef.id
      //   })
      //   .catch(err => {
      //     console.error('Error adding document: ', err)
      //   })
    }
  },
  modules: {
  }
})
