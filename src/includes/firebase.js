import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCOiZzwgN-I_ITXSukmkC3ENm6Lq9vZpt8',
  authDomain: 'music-e449b.firebaseapp.com',
  projectId: 'music-e449b',
  storageBucket: 'music-e449b.appspot.com',
  appId: '1:931119965846:web:f95e8cacdc73a875bc44b7'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
