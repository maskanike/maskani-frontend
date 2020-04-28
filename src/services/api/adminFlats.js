import axios from 'axios'

export default {
  getFlats(params) {
    return axios.get('/flats', {
      params
    })
  },
  editFlat(id, payload) {
    return axios.patch(`/flats/${id}`, payload)
  },
  saveFlat(payload) {
    return axios.post('/flats/', payload)
  },
  deleteFlat(id) {
    return axios.delete(`/flats/${id}`)
  }
}
