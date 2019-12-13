const firebase = require('firebase/app')
require('firebase/firestore')

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_CLOUD_FIRESTORE_PROJECT_ID
})

var db = firebase.firestore()
module.exports = db
