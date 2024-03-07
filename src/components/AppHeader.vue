<template>
  <header id="header" class="border-b">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <p class="text-call-to-action font-bold uppercase text-3xl mr-4" href="#">Flashcards</p>

      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!usersStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <p>{{ usersStore.userName }}</p>
            <li>
              <a
                class="px-2 text-white hover:text-call-to-action"
                href="#"
                @click.prevent="usersStore.signOut"
                >Logout</a
              >
            </li>
            <!-- <router-link :to="{ name: 'learn' }">Learn</router-link> -->
          </template>
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
