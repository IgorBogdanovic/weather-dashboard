<template>
  <button class="btn" @click="$emit('clicked')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button'
})
</script>

<style lang="scss">
@import '@/assets/style/settings/_module-settings';

.btn {
  background-color: $blue;
  color: $white;
  border-radius: 5px;
  padding: .5rem 1rem;
}
</style>
