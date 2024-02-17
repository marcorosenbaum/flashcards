<template>
  <data-chart v-if="userLoggedIn"></data-chart>
  <create-card v-if="userLoggedIn"></create-card>
  <render-cards v-if="userLoggedIn"></render-cards>

  <div v-show="!userLoggedIn">
    <h1>Welcome to Flashcards!</h1>
    <p>Congratulations on taking the first step towards your learning journey!</p>
    <p>
      This is your personal flashcard collection, designed to empower your learning experience.
      Here, you can create flashcards for all the new and exciting things you're discovering.
    </p>
    <p>
      The chart you see reflects your incredible progress. It's a visual representation of all the
      knowledge you've accumulated on your learning path. Remember, every card you create represents
      a step forward on your journey to mastery.
    </p>
    <p>
      Whenever you feel stuck or overwhelmed, let this chart be your guide. It's a reminder of how
      far you've come and the amazing progress you've made. Stay motivated and keep pushing forward!
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
