import axios from 'axios'

export default {
  getAllFlats() {
    return axios.get('/flats/all')
  },
  getUserFlat() {
    return axios.get(`/flats/user`)
  },
  saveUserFlat(id, payload) {
    return axios.post(`/flats/users/${id}`, payload)
  }
}
