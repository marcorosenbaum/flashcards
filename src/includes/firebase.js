import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCOiZzwgN-I_ITXSukmkC3ENm6Lq9vZpt8',
//   authDomain: 'music-e449b.firebaseapp.com',
//   projectId: 'music-e449b',
//   storageBucket: 'music-e449b.appspot.com',
//   appId: '1:931119965846:web:f95e8cacdc73a875bc44b7'
// }

const firebaseConfig = {
  apiKey: 'AIzaSyB-4UIAHzN2rC_h_uRx_YcP_JTCxxJEL_s',
  authDomain: 'flashcards-8fb46.firebaseapp.com',
  projectId: 'flashcards-8fb46',
  storageBucket: 'flashcards-8fb46.appspot.com',
  messagingSenderId: '718814781519',
  appId: '1:718814781519:web:279b01db860a81897f4a3a',
  measurementId: 'G-NLY1TEZ2DJ'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
