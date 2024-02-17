<template>
  <!-- Header -->
  <header id="header" class="border-b">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-call-to-action font-bold uppercase text-2xl mr-4" href="#">Flashcards</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!usersStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <!-- <li>
              <a class="px-2 text-white" href="#">Manage</a>
            </li> -->
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="usersStore.signOut">Logout</a>
            </li>
            <p>{{ usersStore.userName }}</p></template
          >
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/users'

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    }
  }
}
</script>
