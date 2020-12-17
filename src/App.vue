<template>
  <div>
    <h1>WEATHER API CC</h1>
    
    <search 
      v-model="location"
      @add="addLocation(location)" />

    <div class="widgets-wrapper">
      <widget
        v-for="item of addedLocations"
        :key="item.id"
        :data="item"
        @remove="removeLocation(item.id)" />
    </div>

    <filters
      v-if="addedLocations.length"
      ref="filters"
      v-model="addedLocations" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import weatherApi from './apis/weatherApi'
import WeatherLocation from './types/WeatherLocation'
import { FiltersRef } from './types/filters'

import Search from './components/Search.vue'
import Widget from './components/Widget.vue'
import Filters from './components/Filters.vue'

export default defineComponent({
  components: {
    Search,
    Widget,
    Filters
  },

  data() {
    return {
      location: '',
      addedLocations: [] as WeatherLocation[]
    }
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getWeatherForLocation(location: string): Promise<any> {
      try {
        return await weatherApi.get({
          path: 'data/2.5/weather',
          query: {
            q: location,
            units: 'metric',
            APPID: process.env.VUE_APP_WEATHER_API_KEY
          }
        })
      } catch {
        alert('City not found.')
      }
    },

    async addLocation(location: string) {
      const response = await this.getWeatherForLocation(location)
      this.location = ''
      if (!response) return

      const locationItem: WeatherLocation = this.createLocationItem(response.data)
      const alreadyAdded: boolean = this.addedLocations.some(item => item.id === locationItem.id)
      if (alreadyAdded) {
        alert('City is already added.')
        return
      }

      this.addedLocations = this.itemAdded(locationItem, this.addedLocations)
      this.$nextTick(() => this.applyFilters())
    },

    removeLocation(id: number) {
      this.addedLocations = this.itemRemoved(id, this.addedLocations)
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createLocationItem(data: any): WeatherLocation {
      return {
        id: data.id,
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        weatherIcon: data.weather[0].icon,
        isVisibleBy: {
          country: true,
          tempRange: true
        }
      }
    },

    applyFilters() {
      const filtersCmp = this.$refs.filters as FiltersRef
      filtersCmp.reFilter()
    },

    itemAdded(item: WeatherLocation, locations: WeatherLocation[]): WeatherLocation[] {
      const clone = [...locations]
      clone.push(item)
      return clone
    },

    itemRemoved(id: number, locations: WeatherLocation[]): WeatherLocation[] {
      return [...locations].filter((item: WeatherLocation) => item.id !== id)
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
  @include fontSizeRem(12, 16);
}

h1 {
  @include fontSizeRem(20, 40);
  text-align: center;
  margin: 1rem 0;

  @include breakpoint(desktop) {
    margin: 2rem 0;
  }
}

input {
  @include fontSizeRem(12, 16);
  outline: none;
  border: 1px solid $light_grey;
  padding: .5rem;
  margin: 0 1rem;

  &[type='checkbox'] {
    @include breakpoint(desktop) {
      width: 2.5rem;
    }
  }
}
</style>
