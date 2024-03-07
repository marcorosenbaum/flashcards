<template>
  <div v-if="editor">
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'text-call-to-action': editor.isActive('bold') }"
    >
      <bold-icon title="Bold" />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'text-call-to-action': editor.isActive('italic') }"
    >
      <italic-icon title="Italic" />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'text-call-to-action': editor.isActive('strike') }"
    >
      <strike-through-icon title="Strike through" />
    </button>

    <button
      @click="editor.chain().focus().toggleUnderline().run()"
      :class="{ 'text-call-to-action': editor.isActive('underline') }"
    >
      <underline-icon title="Underline" />
    </button>
    <button
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'text-call-to-action': editor.isActive('code') }"
    >
      <code-tags-icon title="Code" />
    </button>
    <button
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'text-call-to-action': editor.isActive('codeBlock') }"
    >
      <code-block-icon title="Code block" />
    </button>

    <button @click="editor.chain().focus().setHorizontalRule().run()"><minus-icon /></button>

    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'text-call-to-action': editor.isActive('heading', { level: 1 }) }"
    >
      <header-one-icon title="Header 1" />
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'text-call-to-action': editor.isActive('heading', { level: 2 }) }"
    >
      <header-two-icon title="Header 2" />
    </button>

    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'text-call-to-action': editor.isActive('bulletList') }"
    >
      <bullet-list-icon title="Bullet List" />
    </button>
    <button
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'text-call-to-action': editor.isActive('orderedList') }"
    >
      <number-list-icon title="Number List" />
    </button>

    <button
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'text-call-to-action': editor.isActive('blockquote') }"
    >
      <block-quote-icon title="Block quote" />
    </button>
  </div>
  <editor-content class="border roundel-xl" :editor="editor" />
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Underline from '@tiptap/extension-underline'
import BoldIcon from 'vue-material-design-icons/FormatBold.vue'
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
import StrikeThroughIcon from 'vue-material-design-icons/FormatStrikeThrough.vue'
import CodeTagsIcon from 'vue-material-design-icons/CodeTags.vue'
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue'
import MinusIcon from 'vue-material-design-icons/Minus.vue'
import CodeBlockIcon from 'vue-material-design-icons/CodeBlockTags.vue'
import HeaderOneIcon from 'vue-material-design-icons/FormatHeader1.vue'
import HeaderTwoIcon from 'vue-material-design-icons/FormatHeader2.vue'
import BulletListIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import NumberListIcon from 'vue-material-design-icons/FormatListNumbered.vue'
import BlockQuoteIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'

export default {
  name: 'TextEditor',
  components: {
    EditorContent,
    BoldIcon,
    ItalicIcon,
    StrikeThroughIcon,
    CodeTagsIcon,
    UnderlineIcon,
    MinusIcon,
    CodeBlockIcon,
    HeaderOneIcon,
    HeaderTwoIcon,
    BulletListIcon,
    NumberListIcon,
    BlockQuoteIcon
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

<style scoped>
/* Basic editor styles */
button {
  margin: 0.5rem;
}
</style>
