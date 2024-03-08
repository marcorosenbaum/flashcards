<template>
  <router-link v-show="Object.keys(store.cardToEdit).length === 0" :to="{ name: 'home' }">
    <arrow-left size="30" class="text-orange-300"></arrow-left>
  </router-link>

  <create-card></create-card>

  <section class="p-4 border rounded-xl bg-light-navy flex justify-between">
    <div class="prose">
      <h1 class="underline">{{ currentCard.cardHeader }}</h1>
      <div v-html="currentCard.cardText"></div>
      <span class="text-orange-300 mr-4">{{ currentCard.category }}</span>

      <span class="text-blue-500"
        >Date
        {{
          currentCard.timestamp.length > 10
            ? currentCard.timestamp.substring(0, 10)
            : currentCard.timestamp
        }}</span
      >
    </div>

    <div class="flex flex-col gap-6">
      <delete-icon size="30" @click="deleteCard(currentCard)"></delete-icon>
      <edit-icon size="30" @click="enableCardEdit(currentCard)"></edit-icon>
    </div>
  </section>
</template>

<script>
import useUserStore from '@/stores/users.js'
import CreateCard from '@/components/CreateCard.vue'
import ArrowLeft from '../../node_modules/vue-material-design-icons/ArrowLeft.vue'
import DeleteIcon from '../../node_modules/vue-material-design-icons/trashCanOutline.vue'
import EditIcon from '../../node_modules/vue-material-design-icons/pencil.vue'

export default {
  name: 'CardView',
  setup() {
    return {
      store: useUserStore()
    }
  },
  components: {
    CreateCard,
    ArrowLeft,
    DeleteIcon,
    EditIcon
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
