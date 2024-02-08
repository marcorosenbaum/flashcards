import './assets/base.css'
import './assets/main.css'
import { auth } from './includes/firebase'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation.js'

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
  }
})
