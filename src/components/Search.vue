<template>
  <div class="input-wrapper">
    <input
      type="text"
      :value="modelValue"
      @keyup.enter="$emit('add')"
      @input="updateValue($event.target.value)">
    <button-cmp @clicked="$emit('add')">Add</button-cmp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonCmp from './ButtonCmp.vue'

export default defineComponent({
  name: 'Search',

  components: {
    ButtonCmp
  },

  props: {
    modelValue: {
      type: String,
      required: true
    }
  },

  methods: {
    updateValue(newValue: string) {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  justify-content: center;
  border: 1px solid $light_grey;
  padding: 3rem;
  margin-bottom: 2rem;
}
</style>
