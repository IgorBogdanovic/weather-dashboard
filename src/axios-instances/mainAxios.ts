import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_MAIN_URL,
  timeout: 5000
})
