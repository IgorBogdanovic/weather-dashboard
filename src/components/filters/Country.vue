<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CountryData } from '@/types/filters'

export default defineComponent({
  name: 'Country',

  data() {
    return {
      countries: [
        { id: 'RS', name: 'Serbia', selected: false },
        { id: 'CH', name: 'Switzerland', selected: false },
        { id: 'NL', name: 'Netherlands', selected: false }
      ] as CountryData[]
    }
  },

  methods: {
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
      this.$emit('filter', { filterBy: 'country', payload })
    }
  }
})
</script>

<style lang="scss" scoped>
.country {
  margin-bottom: 1.5rem;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin-top: 1rem;

    @include breakpoint(desktop) {
      display: inline-flex;
      margin: 0;
    }

    input, label {
      cursor: pointer;
    }
  }
}
</style>
