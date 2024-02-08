<template>
  <div></div>
</template>

<script>
import useUserStore from '@/stores/users.js'

export default {
  name: 'TestArea',
  setup() {
    return {
      store: useUserStore()
    }
  },
  data() {
    return {
      msg: 0
    }
  },
  watch: {
    store: {
      handler() {
        this.setMessage()
      },
      deep: true // Set to true if myState is an object or an array
    }
  },
  methods: {
    setMessage() {
      this.msg++
    }
  }
}
</script>

<style lang="scss" scoped></style>
