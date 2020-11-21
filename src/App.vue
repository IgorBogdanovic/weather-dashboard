<template>
  <div>
    <h1>WEATHER API CC</h1>
    <div class="input-wrapper">
      <input type="text" v-model="location">
      <button-cmp @clicked="addLocation(location)">Add</button-cmp>
    </div>
    <div class="widgets-wrapper">
      <widget
        v-for="item of addedLocations"
        :key="item.id"
        :data="item"
        @remove="removeWidget(item.id)" />
    </div>
    <div v-if="addedLocations.length" class="order">
      Order by: <span @click="orderByName()">Name</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mainApi from './apis/mainApi'
import WeatherLocation from './types/WeatherLocation'

import ButtonCmp from './components/ButtonCmp.vue'
import Widget from './components/Widget.vue'

export default defineComponent({
  components: {
    ButtonCmp,
    Widget
  },

  data() {
    return {
      location: '',
      addedLocations: [] as WeatherLocation[]
    }
  },

  methods: {
    async getWeatherForLocation(location: string): Promise<any> {
      return await mainApi.get({
        path: 'data/2.5/weather',
        query: {
          q: location,
          units: 'metric',
          APPID: process.env.VUE_APP_API_KEY
        }
      })
    },

    async addLocation(location: string) {
      const { data } = await this.getWeatherForLocation(location)
      this.addedLocations.push({
        id: data.id,
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        weatherDescription: data.weather[0].description
      })
    },

    removeWidget (id: number) {
      this.addedLocations = this.addedLocations.filter(item => item.id !== id)
    },

    orderByName(): WeatherLocation[] {
      return this.addedLocations.sort((a, b) => {
        const cityA = a.city.toUpperCase()
        const cityB = b.city.toUpperCase()
        if (cityA < cityB) {
          return -1
        }
        if (cityA > cityB) {
          return 1
        }
        return 0
      })
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/style/main";

#app {
  max-width: 144rem;
  padding: 1rem;
  margin: 0 auto;
  font-family: sans-serif;
  color: $font_color;
  text-align: center;
  @include fontSizeRem(10, 16);
}

h1 {
  @include fontSizeRem(20, 40);
  text-align: center;
  margin: 1rem 0;
  @include breakpoint(desktop) {
    margin: 2rem 0;
  }
}

.input-wrapper {
  border: 1px solid $light_grey;
  padding: 3rem;
  margin-bottom: 2rem;

  input {
    outline: none;
    border: 1px solid $light_grey;
    padding: .5rem;
    margin-right: 1rem;
  }
}

.order {
  span {
    color: $blue;
    cursor: pointer;
  }
}
</style>
