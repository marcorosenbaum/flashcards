<template>
  <router-link v-show="Object.keys(store.cardToEdit).length === 0" :to="{ name: 'home' }">
    click HERE to go back
  </router-link>

  <create-card></create-card>

  <section class="p-4 border rounded-xl bg-light-navy flex justify-between">
    <div class="prose">
      <h1 class="underline">{{ currentCard.cardHeader }}</h1>
      <div style="white-space: pre-line" v-html="currentCard.cardText"></div>
      <span class="text-green-500">{{ currentCard.category }}</span>
      <span class="text-purple-500">{{ currentCard.cardId }}</span>
      <span class="text-blue-500">{{ currentCard.timestamp }}</span>
    </div>

    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-trash-2"
        @click="deleteCard(currentCard)"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-pencil"
        @click="enableCardEdit(currentCard)"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    </div>
  </section>
</template>

<script>
import useUserStore from '@/stores/users.js'
import CreateCard from '@/components/CreateCard.vue'

export default {
  name: 'CardView',
  setup() {
    return {
      store: useUserStore()
    }
  },
  components: {
    CreateCard
  },
  data() {
    return {
      editCard: false
    }
  },
  computed: {
    currentCard() {
      const currentCard = this.store.cards.find((card) => card.cardId == this.$route.params.id)

      return currentCard || { error: 'Card not found' }
    }
  },
  methods: {
    enableCardEdit(currentCard) {
      this.editCard = true
      this.store.cardInputOpen = true
      this.store.cardToEdit = currentCard
    },
    deleteCard(card) {
      if (
        window.confirm(
          "Are you sure you want to delete this card? It can't be restored afterwards."
        )
      ) {
        this.store.deleteCardToFirebase(card)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    const store = useUserStore()
    if (store.userLoggedIn) {
      next()
    } else {
      next({ name: 'home' })
    }
  }
}
</script>

<style scoped>
button {
  margin: 0.5rem;
  border: 2px;
}
</style>
