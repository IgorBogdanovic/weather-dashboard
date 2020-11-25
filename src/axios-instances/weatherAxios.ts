import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_WEATHER_URL,
  timeout: 5000
})
