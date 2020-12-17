<template>
  <div class="order">
    Order by: 
    <span @click="$emit('filter', { filterBy: 'name' })">Name</span>
    |
    <span @click="$emit('filter', { filterBy: 'temperature' })">Temperature</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Order'
})
</script>

<style lang="scss" scoped>
span {
  color: $blue;
  cursor: pointer;
}
</style>
