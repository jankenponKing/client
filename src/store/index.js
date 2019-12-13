import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import db from '../config/firebase'
// import texts from '../assets/english'
import Swal from 'sweetalert2'
// import { log } from 'util'
// const firebase = require('firebase/app')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listRoom: [],
    objectData: {},
    username: '',
    linkroom: '',
    countPlayer: 0,
    master: false,
    player2: ''
  },
  mutations: {
    ADD_DATA (state, payload) {
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
    readRoom ({ commit }) {
      db.collection('room').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data())
          if (doc.data().count < 2) {
            // console.log('masuk');
            router.push(`/about/${doc.id}`)
          }
        })
      })
    },
    create ({ commit, state }, payload) {
      console.log(payload)
      // const index = Math.round(Math.random() * texts.length)
      Swal.fire({
        imageUrl: '',
        text: 'Create Room',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
      })
      db.collection('room').add(
        {
          count: 1,
          player1: {
            username: payload,
            option: '',
            master: true
          },
          // text: texts[index].text,
          playStatus: false
        }
      )
        .then((docRef) => {
          commit('CHANGE_ROOM', docRef.id)
          commit('CHANGE_COUNT_PLAYER', 1)
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
    fetchData ({ commit, state }, payload) {
      commit('CHANGE_ROOM', payload)
      db.collection('room').doc(`${payload}`)
        .onSnapshot(function (doc) {
          commit('ADD_DATA', doc.data())
          // console.log('data saat ini', doc.data())
        })
    },
    addPlayer ({ commit, state }, payload) {
      let countPlayer = state.objectData.count + 1
      commit('CHANGE_COUNT_PLAYER', countPlayer)
      db.collection('room').doc(`${payload.room}`).update({
        [`player${countPlayer}`]: {
          username: payload.newuser,
          option: '',
          master: false
        },
        count: state.objectData.count + 1
      })
        .then(function () {
          commit('CHANGE_NAME', payload.newuser)
          console.log()
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    updatePosition ({ commit, state }, payload) {
      return db.collection('room').doc(`${payload.room}`).update({
        [`player${state.countPlayer}.position`]: payload.position,
        [`player${state.countPlayer}.wpm`]: payload.wpm,
        [`player${state.countPlayer}.username`]: state.username
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
