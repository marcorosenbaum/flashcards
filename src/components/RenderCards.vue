<template>
  <hr />

  <button class="border border-gray-400" @click="filterSelectionIsOpen = !filterSelectionIsOpen">
    {{ filterSelectionIsOpen ? 'close filter' : 'open filter' }}
  </button>

  <div v-show="filterSelectionIsOpen">
    <button class="border border-gray-400" @click="toggleAllNoneFilter(true)">select all</button>
    <button class="border border-gray-400" @click="toggleAllNoneFilter(false)">select none</button>

    <div v-for="(value, category) in filter" :key="category">
      <input type="checkbox" :id="`filter-${category}`" v-model="filter[category]" />
      <label :for="`filter-${category}`">
        {{ category }}
      </label>
    </div>
  </div>
  <ul>
    <li class="border border-gray-400" v-for="card in filteredMemoryCards" :key="card.cardHeader">
      <span class="underline">{{ card.cardHeader }}</span>
      <p>{{ card.cardText }}</p>
      <span class="text-green-500">{{ card.category }}</span>
      <span @click="deleteCard(card)" class="text-red-500">DELETE</span>
      <span @click="editCard(card)" class="text-blue-500">EDIT</span>
    </li>
  </ul>
</template>

<script>
import useUserStore from '@/stores/users.js'

export default {
  name: 'RenderCard',
  setup() {
    return {
      store: useUserStore()
    }
  },
  data() {
    return {
      filteredMemoryCards: [],
      filter: {},
      filterSelectionIsOpen: false
    }
  },
  watch: {
    'store.categories': {
      handler() {
        this.store.categories.forEach((element) => (this.filter[element] = true))
      },
      deep: true
    },
    'store.cards': {
      handler() {
        this.renderFilteredMemoryCards()
      },
      deep: true
    },
    filter: {
      handler() {
        this.renderFilteredMemoryCards()
      },
      deep: true
    }
  },

  methods: {
    editCard(currentCard) {
      this.store.cardInputOpen = true
      this.store.cardToEdit = currentCard
    },

    deleteCard(card) {
      this.store.deleteCardToFirebase(card)
    },

    toggleAllNoneFilter(value) {
      for (let key in this.filter) {
        this.filter[key] = value
      }
    },

    renderFilteredMemoryCards() {
      const selectedFilter = []
      for (let filter in this.filter) {
        if (this.filter[filter]) {
          selectedFilter.push(filter)
        }
      }

      this.filteredMemoryCards = this.store.cards.filter((card) =>
        selectedFilter.includes(card.category)
      )
    }
  },

  beforeMount() {
    this.store.categories.forEach((element) => (this.filter[element] = true))
    this.renderFilteredMemoryCards()
  }
}
</script>

<style scoped>
* {
  margin: 0.5rem;
}
</style>
