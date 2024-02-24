<template>
  <data-chart></data-chart>
  <create-card v-if="userLoggedIn"></create-card>
  <render-cards v-if="userLoggedIn"></render-cards>

  <div v-show="!userLoggedIn" class="mb-16">
    <h1 class="text-3xl my-6 text-light-pink">Welcome to Flashcards!</h1>
    <!-- <p>Congratulations on taking the first step towards your learning journey!</p> -->
    <p>
      This is your personal flashcard collection, designed to empower your learning experience.
      Here, you can <span class="text-light-pink">create flashcards</span> for all the new and
      exciting things you're discovering.
    </p>
    <div
      class="p-4 mx-auto prose border my-6 flex flex-col rounded-xl bg-light-navy transform duration-300 hover:scale-[101%] hover:shadow-around hover:shadow-blue-600"
    >
      <h1 class="underline">Example card</h1>
      <div>
        <p>This is an example flashcard. You can write what ever you want in a flashcard.</p>
        <p>That can be notes, bullet list, numbered lists, headings, code blocks and more.</p>
      </div>
      <div class="flex justify-between">
        <span class="text-green-500">general Cards</span>

        <span class="text-blue-500">01.02.2024</span>
      </div>
    </div>
    <p class="text-justify">
      The <span class="text-light-pink">chart above reflects your incredible progress</span>. It's a
      visual representation of all the knowledge you've accumulated on your learning path. Remember,
      every card you create represents a step forward on your journey to mastery.
    </p>
    <p class="text-justify">
      Whenever you feel stuck or overwhelmed,
      <span class="text-light-pink">let this chart be your guide</span>. It's a reminder of how far
      you've come and the amazing progress you've made. Stay motivated and keep pushing forward!
    </p>
  </div>
</template>

<script>
import CreateCard from '@/components/CreateCard.vue'
import RenderCards from '@/components/RenderCards.vue'
import DataChart from '@/components/DataChart.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/users.js'

import { auth } from '@/includes/firebase'

export default {
  name: 'HomeView',
  components: {
    CreateCard,
    RenderCards,
    DataChart
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'userName', 'cardInputOpen'])
  },

  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
      this.userName = auth.currentUser.displayName
    }
  }
}
</script>
