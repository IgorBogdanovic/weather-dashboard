<template>
  <div
    v-if="data.isVisibleBy.country && data.isVisibleBy.tempRange"
    class="widget">
    <div class="location-info">
      <p>{{ data.city }} ({{ data.country }})</p>
    </div>
    <div class="weather-info">
      <p>{{ data.temperature }} <sup>o</sup>C</p>
      <img :src="`http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`" alt="weather icon">
      <button-cmp @clicked="$emit('remove')">Remove</button-cmp>
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

<style lang="scss" scoped>
.widget {
  display: flex;
  justify-content: space-between;
  border: 1px solid $light_grey;
  padding: 1.5rem 3rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  .location-info {
    @include fontSizeRem(14, 20);
    display: flex;
    align-items: center;
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }

  img {
    width: 6rem;
    margin: 0 auto;
  }

  button {
    margin-top: 1rem;
  }
}
</style>
