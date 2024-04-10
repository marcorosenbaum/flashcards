<template>
  <button class="border rounded-2xl" @click="filterSelectionIsOpen = !filterSelectionIsOpen">
    {{ filterSelectionIsOpen ? 'close filter' : 'set filter' }}
  </button>

  <div class="my-2" v-show="filterSelectionIsOpen">
    <button class="border rounded-2xl" @click="showCategories = !showCategories">
      {{ showCategories ? 'hide categories' : 'show categories' }}
    </button>
    <div class="mt-2">
      <button
        v-show="showCategories"
        class="border rounded-2xl mr-2"
        @click="toggleAllNoneFilter(true)"
      >
        select all
      </button>
      <button
        v-show="showCategories"
        class="border rounded-2xl"
        @click="toggleAllNoneFilter(false)"
      >
        select none
      </button>
    </div>
    <div v-show="showCategories" class="flex flex-wrap gap-2">
      <div v-for="(value, category) in filter" :key="category" class="mt-4">
        <input
          class="reset-input"
          type="checkbox"
          :id="`filter-${category}`"
          v-model="filter[category]"
        />
        <label
          class="p-2 border border-orange-300 rounded-2xl"
          :for="`filter-${category}`"
          :class="{
            'text-blue-950': filter[category],
            ' bg-orange-300': filter[category]
          }"
        >
          {{ category }}
        </label>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div class="mr-4 mt-4">
        <label for="startDate">Start Date:</label>
        <input
          class="bg-light-navy border ml-2"
          type="date"
          id="startDate"
          v-model="filterStartDate"
        />
      </div>
      <div class="mt-4">
        <label for="endDate">End Date:</label>
        <input class="bg-light-navy border ml-2" type="date" id="endDate" v-model="filterEndDate" />
      </div>
    </div>
    <button
      class="rounded-2xl border mt-4"
      @click="filterStartDate && filterEndDate ? renderFilteredMemoryCards() : null"
    >
      set date
    </button>
  </div>

  <ul>
    <router-link
      @click="cardStore.cardInputOpen = false"
      :to="{ name: 'cardview', params: { id: card.cardId } }"
      v-for="card in filteredMemoryCards"
      :key="card.cardId"
    >
      <li
        class="p-4 prose border my-10 rounded-xl bg-light-navy flex justify-between transform duration-300 hover:scale-[101%] hover:shadow-around hover:shadow-blue-600"
      >
        <div>
          <h1 class="underline">{{ card.cardHeader }}</h1>
          <div
            v-html="
              card.cardText.length > 200 ? card.cardText.substring(0, 200) + '...' : card.cardText
            "
          ></div>

          <span class="text-orange-300 mr-4">{{ card.category }}</span>

          <span class="text-blue-500"
            >Date
            {{
              card.timestamp.length > 10 ? card.timestamp.substring(0, 10) : card.timestamp
            }}</span
          >
        </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
import useUserStore from '@/stores/users.js'
import useCardStore from '@/stores/card.js'

export default {
  name: 'RenderCard',
  setup() {
    return {
      userStore: useUserStore(),
      cardStore: useCardStore()
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
    'cardStore.categories': {
      handler() {
        this.cardStore.categories.forEach((element) => (this.filter[element] = true))
      },
      deep: true
    },
    'cardStore.cards': {
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
      this.cardStore.cardInputOpen = true
      this.cardStore.cardToEdit = currentCard
    },

    toggleAllNoneFilter(value) {
      for (let key in this.filter) {
        this.filter[key] = value
      }
    },

    // rename filter to categories?
    renderFilteredMemoryCards() {
      const selectedFilter = []
      for (let filter in this.filter) {
        if (this.filter[filter]) {
          selectedFilter.push(filter)
        }
      }
      if (this.filterStartDate && this.filterEndDate) {
        this.filteredMemoryCards = this.cardStore.cards.filter((card) => {
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
        this.filteredMemoryCards = this.cardStore.cards.filter((card) =>
          selectedFilter.includes(card.category)
        )
      this.filteredMemoryCards.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    }
  },

  // is this right? i want it only to get rendered when first created
  beforeMount() {
    this.cardStore.categories.forEach((element) => (this.filter[element] = true))
    this.renderFilteredMemoryCards()
  }
}
</script>

<style scoped>
button {
  padding: 0.25rem;
}

button:hover {
  scale: 1.05;
}
</style>
