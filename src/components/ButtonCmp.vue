<template>
  <button class="btn" @click="$emit('clicked')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonCmp'
})
</script>

<style lang="scss" scoped>
.btn {
  @include fontSizeRem(12, 16);
  color: $white;
  background-color: $blue;
  border-radius: 5px;
  padding: .3rem .6rem;

  @include breakpoint(desktop) {
    padding: .5rem 1rem;
  }
}
</style>
