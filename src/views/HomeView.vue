<template>
  <data-chart v-if="userLoggedIn"></data-chart>
  <create-card v-if="userLoggedIn"></create-card>
  <render-cards v-if="userLoggedIn"></render-cards>

  <p v-show="!userLoggedIn">hi welcome view</p>
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
