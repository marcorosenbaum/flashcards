<template>
  <button class="border-2 rounded-2xl" @click="filterSelectionIsOpen = !filterSelectionIsOpen">
    {{ filterSelectionIsOpen ? 'close filter' : 'set filter' }}
  </button>

  <div v-show="filterSelectionIsOpen">
    <button class="border-2 rounded-2xl" @click="showCategories = !showCategories">
      {{ showCategories ? 'hide categories' : 'show categories' }}
    </button>
    <button
      v-show="showCategories"
      class="border-2 rounded-2xl ml-2"
      @click="toggleAllNoneFilter(true)"
    >
      select all
    </button>
    <button
      v-show="showCategories"
      class="border-2 rounded-2xl ml-2"
      @click="toggleAllNoneFilter(false)"
    >
      select none
    </button>
    <div v-show="showCategories">
      <div v-for="(value, category) in filter" :key="category">
        <input
          class="reset-input"
          type="checkbox"
          :id="`filter-${category}`"
          v-model="filter[category]"
        />
        <label
          :for="`filter-${category}`"
          :class="{ 'border-2 rounded-xl bg-blue-600': filter[category] }"
        >
          {{ category }}
        </label>
      </div>
    </div>

    <div class="">
      <label for="startDate">Start Date:</label>
      <input class="bg-light-navy border" type="date" id="startDate" v-model="filterStartDate" />

      <label for="endDate">End Date:</label>
      <input class="bg-light-navy border" type="date" id="endDate" v-model="filterEndDate" />
      <button
        class="rounded-2xl border-2 border-call-to-action ml-2"
        @click="filterStartDate && filterEndDate ? renderFilteredMemoryCards() : null"
      >
        set date
      </button>
    </div>
  </div>

  <ul>
    <router-link
      :to="{ name: 'cardview', params: { id: card.cardId } }"
      v-for="card in filteredMemoryCards"
      :key="card.cardId"
    >
      <li
        class="border mt-10 rounded-xl bg-light-navy flex justify-between transition-transform hover:shadow-inner hover:shadow-blue-600"
      >
        <div>
          <span class="underline text-xl">{{ card.cardHeader }}</span>
          <div style="white-space: pre-line">
            {{
              card.cardText.length > 200 ? card.cardText.substring(0, 200) + '...' : card.cardText
            }}
          </div>
          <span class="text-green-500">{{ card.category }}</span>
          <span class="text-purple-500">{{ card.cardId }}</span>
          <span class="text-blue-500">{{ card.timestamp }}</span>
        </div>
      </li>
    </router-link>
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
  padding: 0.25rem;
}

li {
  margin-top: 1rem;
}

button:hover {
  scale: 1.05;
}
</style>
