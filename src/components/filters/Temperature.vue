<template>
  <div class="temperature">
    Temperature:
    <div class="inputs">
      from:
      <input type="number" v-model="tempRange.from" @input="onTempRangeInput()">
      to:
      <input type="number" v-model="tempRange.to" @input="onTempRangeInput()">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TempRange } from '@/types/filters'

export default defineComponent({
  name: 'Temperature',

  data() {
    return {
      tempRange: { from: '0', to: '100' } as TempRange
    }
  },

  methods: {
    onTempRangeInput() {
      this.$emit('filter', { filterBy: 'tempRange', payload: { 
        from: this.tempRange.from,
        to: this.tempRange.to
      }})
    }
  }
})
</script>

<style lang="scss" scoped>
.temperature {
  margin-top: 2rem;

  .inputs {
    margin: .5rem 0 0 1rem;

    @include breakpoint(desktop) {
      margin: .5rem 0 0 0;
    }

    input {
      width: 6rem;
      border-radius: 4px;
      text-align: right;

      @include breakpoint(desktop) {
        width: 8rem;
      }
    }
  }
}
</style>
