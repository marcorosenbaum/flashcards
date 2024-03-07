import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      // Add the module as an external dependency
      external: [
        'vue-material-design-icons/trashCanOutline.vue',
        'vue-material-design-icons/FormatStrikeThrough.vue',
        'vue-material-design-icons/FormatBold.vue',
        'vue-material-design-icons/FormatItalic.vue',
        'vue-material-design-icons/FormatStrikeThrough.vue',
        'vue-material-design-icons/CodeTags.vue',
        'vue-material-design-icons/FormatUnderline.vue',
        'vue-material-design-icons/Minus.vue',
        'vue-material-design-icons/CodeBlockTags.vue',
        'vue-material-design-icons/FormatHeader1.vue',
        'vue-material-design-icons/FormatHeader2.vue',
        'vue-material-design-icons/FormatListBulleted.vue',
        'vue-material-design-icons/FormatListNumbered.vue',
        'vue-material-design-icons/CommentQuoteOutline.vue'
      ]
    }
  }
})
