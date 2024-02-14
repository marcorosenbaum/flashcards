<template>
  <button
    v-show="enableCreateCard"
    class="border-2 border-black m-2"
    @click="store.cardInputOpen = true"
  >
    Create card
  </button>

  <div v-show="store.cardInputOpen">
    <input
      type="text"
      id="card-header"
      placeholder="card header"
      class="border border-gray-400"
      v-model="inputCardHeader"
    />
    <textarea
      id="card-text"
      placeholder="write down some text"
      class="w-full h-20 border border-gray-400"
      v-model="inputCardText"
    ></textarea>

    <div v-show="createCategory">
      <input
        type="text"
        placeholder="type in category name"
        class="w-1/5 h-10 border border-gray-400"
        v-model.lazy="inputCreateNewCategory"
      />
      <button @click="saveNewCategory()">save category</button>
    </div>

    <button v-show="!inputCardCategory && !createCategory" @click="showCategories = true">
      select category
    </button>

    <p @click="showCategories = true" v-show="inputCardCategory && !showCategories">
      {{ inputCardCategory }}
    </p>

    <div v-show="showCategories && !createCategory">
      <ul>
        <li @click="createCategory = true">create new category..</li>
        <li
          @click="setInputCardCategory(category)"
          v-for="category in store.categories"
          :key="category"
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <button
      v-show="inputCardText && inputCardCategory"
      v-on:click="onSave"
      class="border border-gray-400"
    >
      Save
    </button>
    <button v-on:click="onCancel" class="border border-gray-400">Cancel</button>
  </div>
</template>

<script>
import useUserStore from '@/stores/users.js'
import { mapActions } from 'pinia'

export default {
  name: 'CreateCard',
  setup() {
    return {
      store: useUserStore()
    }
  },
  data() {
    return {
      inputCardHeader: '',
      inputCardText: '',
      inputCardCategory: '',
      showCategories: false,
      createCategory: false,
      inputCreateNewCategory: ''
    }
  },
  watch: {
    'store.cardToEdit': {
      handler() {
        if (this.store.cardToEdit) {
          this.inputCardHeader = this.store.cardToEdit.cardHeader
          this.inputCardText = this.store.cardToEdit.cardText
          this.inputCardCategory = this.store.cardToEdit.category
        }
      }
    }
  },
  computed: {
    enableCreateCard() {
      if (
        !this.store.cardInputOpen &&
        Object.keys(this.store.cardToEdit).length === 0 &&
        this.$route.name === 'home'
      ) {
        return true
      } else return false
    }
  },
  methods: {
    ...mapActions(useUserStore, ['saveCardToFirebase', 'updateCardInStore']),

    setInputCardCategory(category) {
      this.inputCardCategory = category
      this.showCategories = false
    },

    saveNewCategory() {
      if (this.inputCreateNewCategory) {
        const newCategoryName = this.inputCreateNewCategory

        this.store.categories.push(newCategoryName)

        this.inputCardCategory = newCategoryName
        this.inputCreateNewCategory = ''
        this.createCategory = false
        this.showCategories = false

        this.store.saveCategoriesToFirebase(this.store.categories)
      }
    },

    onSave() {
      if (this.inputCardHeader && this.inputCardCategory && this.inputCardText) {
        const timestamp = new Date().toISOString()

        if (Object.keys(this.store.cardToEdit).length === 0) {
          this.saveMemoryCard(timestamp)
          this.store.totalCards = this.store.cards.length

          this.saveCardToFirebase(
            this.inputCardHeader,
            this.inputCardText,
            this.inputCardCategory,
            timestamp
          )
        } else
          this.saveCardToFirebase(
            this.inputCardHeader,
            this.inputCardText,
            this.inputCardCategory,
            this.store.cardToEdit.timestamp,
            this.store.cardToEdit.cardId
          ),
            this.updateCardInStore(
              this.inputCardHeader,
              this.inputCardText,
              this.inputCardCategory
            ),
            (this.inputCardHeader = ''),
            (this.inputCardText = ''),
            (this.inputCardCategory = '')
      }
      this.store.cardInputOpen = false
    },

    onCancel() {
      if (this.inputCardCategory && this.inputCardText) {
        window.confirm('Are you sure you want to cancel? All changes will be lost.')
      }
      this.inputCardHeader = ''
      this.inputCardText = ''
      this.inputCardCategory = ''
      this.store.cardToEdit = {}
      this.store.cardInputOpen = false
    },

    saveMemoryCard(timestamp) {
      this.store.totalCreatedCards++
      this.store.cards.push({
        cardHeader: this.inputCardHeader,
        cardText: this.inputCardText,
        category: this.inputCardCategory,
        timestamp: timestamp,
        cardId: this.store.totalCreatedCards
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0.5rem;
}
</style>
