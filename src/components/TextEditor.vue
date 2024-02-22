<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'bg-gray-500': editor.isActive('bold') }"
    >
      <bold-icon title="bold" />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'bg-gray-500': editor.isActive('italic') }"
    >
      <italic-icon />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'bg-gray-500': editor.isActive('strike') }"
    >
      <strike-through-icon />
    </button>
    <button
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'bg-gray-500': editor.isActive('code') }"
    >
      code
    </button>

    <button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'bg-gray-500': editor.isActive('codeBlock') }"
    >
      code block
    </button>
    <button
      @click="editor.chain().focus().toggleUnderline().run()"
      :class="{ 'is-active': editor.isActive('underline') }"
    >
      underline
    </button>

    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      h1
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </button>

    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      bullet list
    </button>
    <button
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      ordered list
    </button>

    <button
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      blockquote
    </button>
  </div>
  <editor-content class="border-2 roundel-xl" :editor="editor" />
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'
import BoldIcon from 'vue-material-design-icons/FormatBold.vue'
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
import StrikeThroughIcon from 'vue-material-design-icons/FormatStrikeThrough.vue'

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },

  mounted() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          class: ' p-2 min-h-[12rem] outline-none prose'
        }
      },
      extensions: [StarterKit, Underline],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      }
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>

<style scoped lang="scss">
/* Basic editor styles */
button {
  margin: 0.5rem;
  border: 2px;
}

// .tiptap {
//   > * + * {
//     margin-top: 0.75em;
//   }

//   ul,
//   ol {
//     padding: 0 1rem;
//   }

//   ul::marker {
//     color: red;
//   }

//   h1 {
//     font-size: 1.75rem;
//   }

//   h2 {
//     font-size: 1.5rem;
//   }

//   h3 {
//     font-size: 1.25rem;
//   }

//   code {
//     background-color: rgba(#acacac, 0.1);
//     color: #616161;
//   }

//   pre {
//     background: #0d0d0d;
//     color: #fff;
//     font-family: 'JetBrainsMono', monospace;
//     padding: 0.75rem 1rem;
//     border-radius: 0.5rem;

//     code {
//       color: inherit;
//       padding: 0;
//       background: none;
//       font-size: 0.8rem;
//     }
//   }

//   // img {
//   //   max-width: 100%;
//   //   height: auto;
//   // }

//   blockquote {
//     padding-left: 1rem;
//     border-left: 2px solid rgba(#0d0d0d, 0.1);
//   }

//   // hr {
//   //   margin: 2rem 0;
//   // }
// }
</style>
