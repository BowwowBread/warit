import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.125.41.251:3001/api',
})