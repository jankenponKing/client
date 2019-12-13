import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../config/firebase'
import router from '@/router'
import Swal from 'sweetalert2'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerCount: 0,
    player: '',
    linkRoom: '',
    objectData: {},
    username: '',
    master: false
  },

  mutations: {
    addPlayer (state, { payload }) {
      this.state.playerCount++
      this.state.player = {
        [`name${this.state.playerCount}`]: payload
      }
      console.log(this.state)
    },
    addData(state, payload)
      {
        console.log('TCL \n============\n jalan nih addData mutations' )
        this.state.objectData = payload
        console.log('TCL \n============\n ', this.state.objectData)
      },
    changeName(state, payload)
      {
        state.username = payload
      },
    changeRoom(state, payload)
      {
        state.linkRoom = payload
      },
    changePlayerCount(state, payload)
      {
        this.playerCount = payload
      },
    changePlayStatus(state, payload)
      {
        state.playStatus = payload
      },
    changeMaster(state)
      {
        this.master = true
      }
  },

  actions: {
    createRoom({ commit, state }, playername)
      {
        Swal.fire({
          imageUrl: 'https://clipart4biz.com/images/transparent-background-loading-3.gif',
          text: 'Creating your room...',
          imageWidth: 200,
          imageHeight: 200,
          showConfirmButton: false
        })

        db.collection('room').add({
          maxPlayer:2,
          playStatus:false,
          player1: {
            username : playername,
            option: '',
          },
          winner:''
        })
        .then(docRef=>{
          console.log('TCL \n============\n ', docRef) 

          commit('changeRoom', docRef.id)
          commit('changePlayerCount', 1)
          // commit('changeName', payload)
          commit('changeMaster')

          router.push(`/joinRoom/${state.linkRoom}`)

          Swal.close()
        })
        .catch(err=>{
          console.log('TCL \n============\n ', err)
        })
      },
    fetchData({ commit, state }, payload)
      {
        console.log('TCL \n============\n ', 'masuk sini fetch data')
        commit('changeRoom', payload)
        db.collection('room').doc(`${payload}`)
          .onSnapshot((doc)=>
            {
              console.log('TCL \n============\n ', 'masuk sinio on snapshot')
              console.log("TCL: doc", doc)
              commit('addData', doc.data())
              console.log('TCL \n============\n doc.data ', doc.data())
              console.log('TCL \n============\n objec data ', this.state.objectData)
            }
        )
      },
    addPlayer ({ commit, state }, payload) {
      // let countPlayer = state.objectData.count + 1
      commit('changePlayerCount', 2)
      db.collection('room').doc(`${payload.room}`).update({
          player2: {
              username : payload.newuser,
              option: '',
            },
        })
        .then(function () {
          commit('changeName', payload.newuser)
          console.log()
          console.log('Document successfully written!')
        })  
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
      },
  modules: {
    }  
})
