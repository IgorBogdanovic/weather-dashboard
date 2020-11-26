<template>
  <div class="filter-wrapper">
    <order @filter="filterBy($event)" />
    <hr>
    <country @filter="filterBy($event)" />
    <temperature @filter="filterBy($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WeatherLocation from '../types/WeatherLocation'
import { FilterActivator, AppliedFilters, TempRange } from '../types/filters'

import Order from './filters/Order.vue'
import Country from './filters/Country.vue'
import Temperature from './filters/Temperature.vue'

export default defineComponent({
  name: 'Filters',

  components: {
    Order,
    Country,
    Temperature
  },

  props: {
    modelValue: {
      type: Array as PropType<WeatherLocation[]>,
      required: true
    }
  },

  data() {
    return {
      filtered: [] as WeatherLocation[],
      appliedFilters: [] as AppliedFilters[]
    }
  },

  methods: {
    async reFilter() {
      for (const { filterBy, payload } of this.appliedFilters) {
        await this.filterBy({ filterBy, payload })
      }
    },

    async filterBy({ filterBy, payload = null }: AppliedFilters) {
      const filterActivator: FilterActivator = {
        name: () => { this.filtered = this.filterByCityName(this.modelValue) },
        temperature: () => { this.filtered = this.filterByTemperature(this.modelValue) },
        country: () => {
          if (Array.isArray(payload) && payload.every(item => typeof item === 'string')) {
            this.filtered = this.filterByCountry(this.modelValue, payload )
          }
        },
        tempRange: () => { this.filtered = this.filterByTempRange(this.modelValue, payload as TempRange) }
      }
      filterActivator[filterBy]()
      this.updateValue(this.filtered)
      this.filtered = []
      this.appliedFilters = this.applyFilter(this.appliedFilters, { filterBy, payload })
    },

    applyFilter(filters: AppliedFilters[], { filterBy, payload = null }: AppliedFilters) {
      const clone = [...filters]
      const filterIndex = clone.findIndex(item => item.filterBy === filterBy)
      if (filterIndex !== -1) {
        clone.splice(filterIndex, 1)
      }
      clone.push({ filterBy, payload })
      return clone
    },

    filterByCityName(locations: WeatherLocation[]): WeatherLocation[] {
      return [...locations].sort((a, b) => {
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
    },

    filterByTemperature(locations: WeatherLocation[]): WeatherLocation[] {
      return [...locations].sort((a, b) => b.temperature - a.temperature)
    },

    filterByCountry(locations: WeatherLocation[], payload: string[]): WeatherLocation[] {
      return [...locations].reduce((acc: WeatherLocation[], cur: WeatherLocation) => {
        if (!payload.length || payload.includes(cur.country)) {
          cur.isVisibleBy.country = true
        } else {
          cur.isVisibleBy.country = false
        }
        acc.push(cur)
        return acc
      }, [])
    },

    filterByTempRange(locations: WeatherLocation[], payload: TempRange) {
      return [...locations].reduce((acc: WeatherLocation[], cur: WeatherLocation) => {
        if (parseInt(payload.from) <= cur.temperature && cur.temperature <= parseInt(payload.to)) {
          cur.isVisibleBy.tempRange = true
        } else {
          cur.isVisibleBy.tempRange = false
        }
        acc.push(cur)
        return acc
      }, [])
    },

    updateValue(newValue: WeatherLocation[]) {
      this.$emit('update:modelValue', newValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.filter-wrapper {
  text-align: start;
  border: 1px solid $light_grey;
  padding: 3rem;

  hr {
    margin: 1.5rem 0;
  }
}
</style>
