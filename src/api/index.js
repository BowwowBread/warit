import axios from 'axios'

export default axios.create({
  baseURL : location.protocol + '//' + location.hostname + ':' + 3001 + '/api'
})