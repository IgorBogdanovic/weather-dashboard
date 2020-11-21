<template>
  <div class="widget">
    <div class="location-info">
      <p>{{ data.city }} ({{ data.country }})</p>
    </div>
    <div class="weather-info">
      <p>{{ data.temperature }} C</p>
      <p>{{ data.weatherDescription }}</p>
      <button-cmp @clicked="$emit('remove')">Remove Widget</button-cmp>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ButtonCmp from './ButtonCmp.vue'
import WeatherLocation from '@/types/WeatherLocation'

export default defineComponent({
  name: 'Widget',

  components: {
    ButtonCmp
  },

  props: {
    data: {
      type: Object as PropType<WeatherLocation>,
      required: true
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/style/settings/_module-settings';

.widget {
  display: flex;
  justify-content: space-between;
  border: 1px solid $light_grey;
  padding: 1.5rem 3rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  button {
    margin-top: 1rem;
  }
}
</style>
