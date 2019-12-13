import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../config/firebase'
import texts from '../assets/english'
import Swal from 'sweetalert2'
// const firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objectData: {},
    username: '',
    wpm: 0,
    position: 0,
    linkroom: '',
    countPlayer: 0,
    master: false
  },
  mutations: {
    ADD_DATA (state, payload) {
      console.log(payload)
      state.objectData = payload
    },
    CHANGE_NAME (state, payload) {
      state.username = payload
    },
    CHANGE_ROOM (state, payload) {
      state.linkroom = payload
    },
    CHANGE_MASTER (state) {
      state.master = true
    },
    CHANGE_COUNT_PLAYER (state, payload) {
      state.countPlayer = payload
    },
    CHANGE_PLAY_STATUS (state, payload) {
      state.playStatus = payload
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      Swal.fire({
        imageUrl: 'https://static-steelkiwi-dev.s3.amazonaws.com/media/filer_public/4e/07/4e07eece-7c84-46e2-944d-1a6b856d7b5f/463ff844-6f36-4ffe-b051-fea983d39223.gif',
        text: 'Creating your room...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
      })
      db.collection('room').add(
        {
          count: 1,
          player1: {
            username: payload,
            option: ''
          }
        }
      )
        .then((docRef) => {
          commit('CHANGE_ROOM', docRef.id)
          commit('CHANGE_COUNT_PLAYER', 1)
          localStorage.setItem('player', 1)
          commit('CHANGE_NAME', payload)
          commit('CHANGE_MASTER')
          router.push(`/about/${state.linkroom}`)
          console.log('Document written with ID: ', docRef.id)
          Swal.close()
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    fetchUser ({ commit, state }, payload) {
      alert(payload)
      commit('CHANGE_ROOM', payload)
      db.collection('room').doc(`${payload}`)
        .onSnapshot(function (doc) {
          alert(doc.data())
          commit('ADD_DATA', doc.data())
          // console.log('data saat ini', doc.data())
        })
    },
    fetchData ({ commit, state }, payload) {
      // commit('CHANGE_ROOM', payload)
      db.collection('room').doc(`${payload}`)
        .onSnapshot(function (doc) {
          console.log(doc.data())
          if (doc.data().player1.option && doc.data().player2.option) {
            let winner = ''
            if (doc.data().player1.option == 'scissor' && doc.data().player2.option == 'paper') winner = doc.data().player1.username
            else if (doc.data().player1.option == 'paper' && doc.data().player2.option == 'rock') winner = doc.data().player1.username
            else if (doc.data().player1.option == 'rock' && doc.data().player2.option == 'scissor') winner = doc.data().player1.username
            else if (doc.data().player1.option == doc.data().player2.option) winner = 'Draw'
            else winner = doc.data().player2.username
            db.collection('room').doc(`${payload}`).update({ winner })
              .then(doc => {
                winner = winner.toUpperCase()
                Swal.fire(`The Winner is ${winner}`)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    addPlayer ({ commit, state }, payload) {
      alert('add player')
      let countPlayer = state.objectData.count + 1
      // commit('CHANGE_COUNT_PLAYER', countPlayer)
      db.collection('room').doc(`${payload.room}`).update({
        [`player${countPlayer}`]: {
          username: payload.newuser,
          option: ''
        },
        count: 2
      })
        .then(function () {
          commit('CHANGE_NAME', payload.newuser)
          localStorage.setItem('player', 2)
          console.log()
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    updatePosition ({ commit, state }, payload) {
      return db.collection('room').doc(`${payload.room}`).update({
        [`player${localStorage.player}.option`]: payload.option
      })
        .then(function (result) {
        // console.log(result)
        })
    },
    playNow ({ commit, name }, roomlink) {
      db.collection('room').doc(`${roomlink}`).update({
        playStatus: true
      })
        .then(function () {
          console.log('GAME PLAY!')
        })
        .catch(function (err) {
          console.error('Error played game: ', err)
        })
    }
  }
})
