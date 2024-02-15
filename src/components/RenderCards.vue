<template>
  <hr />

  <button class="border border-gray-400" @click="filterSelectionIsOpen = !filterSelectionIsOpen">
    {{ filterSelectionIsOpen ? 'close filter' : 'open filter' }}
  </button>

  <div v-show="filterSelectionIsOpen">
    <button class="border border-gray-400" @click="showCategories = !showCategories">
      {{ showCategories ? 'hide categories' : 'show categories' }}
    </button>
    <div v-show="showCategories">
      <button class="border border-gray-400" @click="toggleAllNoneFilter(true)">select all</button>
      <button class="border border-gray-400" @click="toggleAllNoneFilter(false)">
        select none
      </button>

      <div v-for="(value, category) in filter" :key="category">
        <input type="checkbox" :id="`filter-${category}`" v-model="filter[category]" />
        <label :for="`filter-${category}`">
          {{ category }}
        </label>
      </div>
    </div>

    <div class="bg-green-100">
      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="filterStartDate" />

      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="filterEndDate" />
      <button @click="filterStartDate && filterEndDate ? renderFilteredMemoryCards() : null">
        set date
      </button>
    </div>
  </div>

  <hr />

  <ul>
    <li
      class="border border-gray-400 bg-light-navy flex justify-between"
      v-for="card in filteredMemoryCards"
      :key="card.cardId"
    >
      <router-link :to="{ name: 'cardview', params: { id: card.cardId } }">
        <div>
          <span class="underline">{{ card.cardHeader }}</span>
          <div style="white-space: pre-line" class="text-ellipsis">
            {{
              card.cardText.length > 200 ? card.cardText.substring(0, 200) + '...' : card.cardText
            }}
          </div>
          <span class="text-green-500">{{ card.category }}</span>
          <span class="text-purple-500">{{ card.cardId }}</span>
          <span class="text-blue-500">{{ card.timestamp }}</span>
        </div>
      </router-link>
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
      filterSelectionIsOpen: false,
      showCategories: false
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
      this.filteredMemoryCards.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    }
  },

  // is this right? i want it only to get rendered when first created
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
