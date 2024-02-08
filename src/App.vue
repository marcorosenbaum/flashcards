<template>
  <app-header></app-header>
  <app-auth></app-auth>

  <data-chart></data-chart>
  <create-card v-if="userLoggedIn"></create-card>
  <render-cards v-if="userLoggedIn"></render-cards>
</template>

<script>
import CreateCard from '@/components/CreateCard.vue'
import RenderCards from '@/components/RenderCards.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import DataChart from '@/components/DataChart.vue'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/users.js'

import { auth } from '@/includes/firebase'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
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
