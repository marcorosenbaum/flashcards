<template>
  <button
    v-show="enableCreateCard"
    class="my-4 rounded-2xl border border-call-to-action text-call-to-action"
    @click="store.cardInputOpen = true"
  >
    Create card
  </button>
  <br />

  <div v-show="store.cardInputOpen">
    <input
      type="text"
      id="card-header "
      placeholder="card header"
      class="border p-1 text-2xl bg-light-navy focus:outline-double"
      v-model="inputCardHeader"
    />

    <div>
      <text-editor v-model="inputCardText" />
    </div>

    <div class="flex gap-2" v-show="createCategory">
      <input
        type="text"
        placeholder="create category"
        class="p-1 border rounded-xl bg-light-navy w-40"
        v-model.lazy="inputCreateNewCategory"
      />
      <button
        class="text-call-to-action border border-call-to-action rounded-xl"
        @click="saveNewCategory()"
      >
        save category
      </button>
      <button class="border rounded-xl" @click="cancelCreateCategory" v-show="createCategory">
        cancel
      </button>
    </div>

    <button
      class="border text-gray-400 rounded-2xl block bg-light-navy"
      v-show="!inputCardCategory && !createCategory && !showCategories"
      @click="showCategories = true"
    >
      select category
    </button>

    <button
      class="rounded-2xl border inline-block mr-2 p-1"
      @click="showCategories = true"
      v-show="inputCardCategory && !showCategories"
    >
      {{ inputCardCategory }}
    </button>

    <div v-show="showCategories && !createCategory">
      <ul class="flex">
        <li>
          <button class="border w-fit mr-2 rounded-2xl" @click="createCategory = true">
            create new category..
          </button>
          <button
            class="border rounded-2xl mr-2 min-w-20"
            @click="setInputCardCategory(category)"
            v-for="category in store.categories"
            :key="category"
          >
            {{ category }}
          </button>
        </li>
      </ul>
    </div>

    <div>
      <button
        v-show="inputCardText && inputCardCategory && inputCardHeader"
        v-on:click="onSave"
        class="rounded-2xl border border-call-to-action mr-2 text-call-to-action"
      >
        Save
      </button>
      <button v-on:click="onCancel" class="border rounded-2xl">Cancel</button>
    </div>
    <hr class="my-4" />
  </div>
</template>

<script>
import useUserStore from '@/stores/users.js'
import { mapActions } from 'pinia'
import TextEditor from '@/components/TextEditor.vue'

export default {
  name: 'CreateCard',
  components: {
    TextEditor
  },
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
      inputCreateNewCategory: '',
      editor: null,
      content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>'
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

    cancelCreateCategory() {
      this.inputCreateNewCategory = ''
      this.createCategory = false
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
}

button {
  min-width: 5rem;
}
</style>
