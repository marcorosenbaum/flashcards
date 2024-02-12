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

    <div class="bg-green-100">
      <button @click="renderFilteredMemoryCards()">filter by date</button>

      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="filterStartDate" />

      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="filterEndDate" />
    </div>
  </div>

  <hr />

  <ul>
    <li
      class="border border-gray-400 flex justify-between"
      v-for="card in filteredMemoryCards"
      :key="card.cardHeader"
    >
      <div>
        <span class="underline">{{ card.cardHeader }}</span>
        <p>{{ card.cardText }}</p>
        <span class="text-green-500">{{ card.category }}</span>
        <span class="text-purple-500">{{ card.timestamp }}</span>
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
          @click="editCard(card)"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </div>
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
      check: [],
      filterStartDate: '',
      filterEndDate: '',
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
      if (
        window.confirm(
          "Are you sure you want to delete this card? It can't be restored afterwards."
        )
      ) {
        this.store.deleteCardToFirebase(card)
      }
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
      if (this.filterStartDate && this.filterEndDate) {
        this.filteredMemoryCards = this.store.cards.filter((card) => {
          const formattedStartDate = new Date(this.filterStartDate)
          const formattedEndDate = new Date(this.filterEndDate)
          formattedEndDate.setDate(formattedEndDate.getDate() + 1)

          if (
            selectedFilter.includes(card.category) &&
            card.timestamp >= formattedStartDate.toISOString() &&
            card.timestamp <= formattedEndDate.toISOString()
          ) {
            return card
          }
        })
      } else
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
