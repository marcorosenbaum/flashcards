<template>
  <create-card v-if="editCard"></create-card>
  <router-link :to="{ name: 'home' }">
    <div>click HERE to go back</div>
  </router-link>
  <!-- <section>
    <h1>{{ currentCard.cardHeader }}</h1>
    <p>{{ currentCard.cardText }}</p>
    <p>category: {{ currentCard.category }}</p>
    <p>Id: {{ currentCard.cardId }}</p>
    <p>saved on: {{ currentCard.timestamp }}</p>
  </section> -->

  <section class="border border-gray-400 flex justify-between">
    <div>
      <span class="underline">{{ currentCard.cardHeader }}</span>
      <p>{{ currentCard.cardText }}</p>
      <span class="text-green-500">{{ currentCard.category }}</span>
      <span class="text-purple-500">{{ currentCard.cardId }}</span>
    </div>

    <div class="flex-col">
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
        @click="deleteCard(card)"
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
    }
  }
}
</script>
<style scoped>
* {
  margin: 0.5rem;
}
</style>
