<template>
  <div class="filter-wrapper">
    <div class="order-by">
      Order by: 
      <span @click="filterBy({ filterBy: 'name' })">Name</span>
      |
      <span @click="filterBy({ filterBy: 'temperature' })">Temperature</span>
    </div>
    <hr>
    
    <div class="country">
      Country:
      <div
        v-for="country of countries"
        :key="country.id"
        class="checkbox-wrapper">
        <input
          type="checkbox"
          :id="country.name"
          :name="country.name"
          :value="country.id"
          :checked="country.selected"
          @input="selectCountry($event.target.value)">
        <label :for="country.name">{{ country.name }}</label>
      </div>
    </div>

    <div class="temperature">
      Temperature:
      <div class="inputs">
        from:
        <input type="number" v-model="tempRange.from" @input="onTempRangeInput()">
        to:
        <input type="number" v-model="tempRange.to" @input="onTempRangeInput()">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import WeatherLocation from '../types/WeatherLocation'
import { CountryData, FilterActivator, AppliedFilters, TempRange } from '../types/filters'

export default defineComponent({
  name: 'Filters',

  props: {
    modelValue: {
      type: Array as PropType<WeatherLocation[]>,
      required: true
    }
  },

  data() {
    return {
      countries: [
        { id: 'RS', name: 'Serbia', selected: false },
        { id: 'CH', name: 'Switzerland', selected: false },
        { id: 'NL', name: 'Netherlands', selected: false }
      ] as CountryData[],

      filtered: [] as WeatherLocation[],
      appliedFilters: [] as AppliedFilters[],
      tempRange: { from: '0', to: '100' } as TempRange
    }
  },

  methods: {
    async reFilter() {
      for (const { filterBy, payload } of this.appliedFilters) {
        await this.filterBy({ filterBy, payload })
      }
    },

    selectCountry(countryId: string) {
      const payload = this.countries.reduce((acc: string[], cur: CountryData) => {
        if (cur.id === countryId) {
          cur.selected = !cur.selected
        }
        if (cur.selected) {
          acc.push(cur.id)
        }
        return acc
      }, [])
      this.filterBy({ filterBy: 'country', payload })
    },

    onTempRangeInput() {
      this.filterBy({ filterBy: 'tempRange', payload: { 
        from: this.tempRange.from,
        to: this.tempRange.to
      }})
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

  span {
    color: $blue;
    cursor: pointer;
  }

  hr {
    margin: 1.5rem 0;
  }

  .checkbox-wrapper {
    display: flex;
    vertical-align: bottom;
    margin-top: 1rem;

    @include breakpoint(desktop) {
      display: inline-flex;
      margin: 0;
    }

    input, label {
      cursor: pointer;
    }
  }

  .country {
    margin-bottom: 1.5rem;
  }

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
}
</style>
