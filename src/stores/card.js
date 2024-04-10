import { defineStore } from 'pinia'
import { updateDoc, deleteField } from 'firebase/firestore'
import { auth, usersCollection } from '@/includes/firebase'
import router from '@/router'

export default defineStore('card', {
  state: () => ({
    cards: [],
    categories: [],
    totalCards: 0,
    totalCreatedCards: 0,
    cardInputOpen: false,
    cardToEdit: {}
  }),
  persist: true,

  actions: {
    async saveCategoriesToFirebase() {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        await updateDoc(docRef, {
          categories: this.categories
        })
      } catch (error) {
        console.error('Error during saveCategoriesToFirebase', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    createCard(cardHeader, cardText, category, timestamp) {
      this.totalCreatedCards++

      class Card {
        constructor(cardHeader, cardText, category, timestamp, cardId) {
          this.cardHeader = cardHeader
          this.cardText = cardText
          this.category = category
          this.timestamp = timestamp
          this.cardId = cardId
        }
      }

      this.cards.unshift(
        new Card(cardHeader, cardText, category, timestamp, this.totalCreatedCards)
      )

      this.totalCards = this.cards.length

      this.saveCardToFirebase(cardHeader, cardText, category, timestamp)
    },

    async saveCardToFirebase(cardHeader, cardText, category, timestamp, cardId) {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        try {
          const doc = await docRef.get()
          if (doc.exists) {
            await updateDoc(docRef, {
              [`cards.card${cardId ? cardId : this.totalCreatedCards}`]: {
                cardHeader: cardHeader,
                cardText: cardText,
                category: category,
                timestamp: timestamp,
                cardId: cardId || this.totalCreatedCards
              },
              totalCards: this.totalCards,
              totalCreatedCards: this.totalCreatedCards
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

    updateCardInStore(inputCardHeader, inputCardText, inputCardCategory) {
      try {
        const cardToUpdate = this.cards.find((card) => card.cardId === this.cardToEdit.cardId)
        cardToUpdate.cardHeader = inputCardHeader
        cardToUpdate.cardText = inputCardText
        cardToUpdate.category = inputCardCategory
      } catch (error) {
        console.error('Error during updateCardInStore', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    },

    async deleteCardToFirebase(card) {
      try {
        const docRef = usersCollection.doc(auth.currentUser.uid)

        const doc = await docRef.get()

        if (doc.exists) {
          await updateDoc(docRef, {
            [`cards.card${card.cardId}`]: deleteField(),
            totalCards: this.totalCards - 1
          })
          const doc = await docRef.get()
          const cards = doc.data().cards

          this.cards = Object.values(cards)
          this.totalCards = this.cards.length
        }
        router.push({ name: 'home' })
      } catch (error) {
        console.error('Error during deleteCardToFIrebase', error)
        window.alert('Sorry, an error occured. Please try again.')
      }
    }
  }
})
