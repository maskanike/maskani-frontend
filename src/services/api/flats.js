import axios from 'axios'

export default {
  getAllFlats() {
    return axios.get('/flats/all')
  },
  getUserFlat() {
    return axios.get(`/flats/user`)
  }
}
