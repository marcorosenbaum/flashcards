import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/includes/firebase'
import { updateDoc, deleteField } from 'firebase/firestore'

export default defineStore('users', {
  state: () => ({
    userLoggedIn: false,
    userName: '',
    cards: [],
    categories: [],
    totalCards: 0,
    cardInputOpen: false,
    cardToEdit: {}
  }),
  persist: true,

  actions: {
    async register(values) {
      try {
        const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

        await usersCollection.doc(userCred.user.uid).set({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
          cards: '',
          categories: '',
          totalCards: 0
        })

        await userCred.user.updateProfile({
          displayName: values.name
        })
        this.userLoggedIn = true

        this.userName = userCred.user.displayName
      } catch (error) {
        console.error('Error during registration:', error)
        window.alert('Sorry, something went wrong. Please try again.')
      }
    },

    async authenticate(values) {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password)

        this.userLoggedIn = true

        const docRef = usersCollection.doc(auth.currentUser.uid)

        const doc = await docRef.get()

        if (doc.exists) {
          const totalCards = doc.data().totalCards
          this.totalCards = totalCards

          const cards = doc.data().cards
          this.cards = Object.values(cards)

          const categories = doc.data().categories
          this.categories = Object.values(categories)
        }
      } catch (error) {
        console.error('Error during authentication', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    async signOut() {
      try {
        await auth.signOut()
        this.userName = ''
        this.cards = []
        this.categories = []
        this.userLoggedIn = false
        this.totalCards = 0
        this.cardToEdit = {}
      } catch (error) {
        console.error('Error during signOut', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    async saveCategoriesToFirebase(categories) {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        await updateDoc(docRef, {
          categories: categories
        })
      } catch (error) {
        console.error('Error during saveCategoriesToFirebase', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    updateCardInStore(inputCardText, inputCardCategory) {
      try {
        const cardToUpdate = this.cards.find((card) => card.cardId === this.cardToEdit.cardId)
        cardToUpdate.cardText = inputCardText
        cardToUpdate.category = inputCardCategory
      } catch (error) {
        console.error('Error during updateCardInStore', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    async saveCardToFirebase(cardText, category, timestamp, cardId) {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        try {
          const doc = await docRef.get()
          if (doc.exists) {
            await updateDoc(docRef, {
              [`cards.card${cardId ? cardId : this.totalCards}`]: {
                cardText: cardText,
                category: category,
                timestamp: timestamp,
                cardId: cardId || this.totalCards
              },
              totalCards: this.totalCards
            })
          }
        } catch (error) {
          console.error('Error getting document:', error)
        }

        this.cardToEdit = {}
      } catch (error) {
        console.error('Error during saveCardToFirebase', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    async deleteCardToFirebase(card) {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        const doc = await docRef.get()

        if (doc.exists) {
          await updateDoc(docRef, {
            [`cards.card${card.cardId}`]: deleteField()
          })
          const doc = await docRef.get()
          const cards = doc.data().cards

          this.cards = Object.values(cards)
        }
      } catch (error) {
        console.error('Error during deleteCardToFIrebase', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    }
  }
})
