<template>
  <button
    v-show="enableCreateCard"
    class="m-2 rounded-2xl border-2 border-call-to-action"
    @click="store.cardInputOpen = true"
  >
    Create card
  </button>
  <br />

  <div v-show="store.cardInputOpen">
    <input
      type="text"
      id="card-header"
      placeholder="card header"
      class="border rounded-xl bg-light-navy focus:outline-double"
      v-model="inputCardHeader"
    />
    <textarea
      id="card-text"
      placeholder="write down some text"
      class="w-full h-40 border rounded-xl bg-light-navy focus:outline-double"
      v-model="inputCardText"
    ></textarea>

    <div v-show="createCategory">
      <input
        type="text"
        placeholder="type in category name"
        class="w-1/5 h-10 border"
        v-model.lazy="inputCreateNewCategory"
      />
      <button @click="saveNewCategory()">save category</button>
    </div>

    <button
      class="border rounded-2xl block bg-light-navy"
      v-show="!inputCardCategory && !createCategory"
      @click="showCategories = true"
    >
      select category
    </button>

    <p
      class="rounded-xl border inline-block mr-2"
      @click="showCategories = true"
      v-show="inputCardCategory && !showCategories"
    >
      {{ inputCardCategory }}
    </p>

    <div v-show="showCategories && !createCategory">
      <ul>
        <span class="border rounded-xl mr-2" @click="createCategory = true"
          >create new category..</span
        >
        <li
          class="border rounded-xl mr-2 w-fit"
          @click="setInputCardCategory(category)"
          v-for="category in store.categories"
          :key="category"
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <div>
      <button
        v-show="inputCardText && inputCardCategory"
        v-on:click="onSave"
        class="border-2 border-call-to-action rounded-2xl"
      >
        Save
      </button>
      <button v-on:click="onCancel" class="border-2 rounded-2xl ml-2">Cancel</button>
    </div>
    <hr />
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

        this.store.saveCategoriesToFirebase()
      }
    },

    onSave() {
      if (this.inputCardHeader && this.inputCardCategory && this.inputCardText) {
        const timestamp = new Date().toISOString()

        if (Object.keys(this.store.cardToEdit).length === 0) {
          this.store.createCard(
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
    }
  }
}
</script>

<style scoped>
* {
  margin-top: 0.5rem;
  padding: 0.25rem;
}

button:hover {
  scale: 1.05;
}
</style>
