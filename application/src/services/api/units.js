import axios from 'axios'

export default {
  getUnits(params) {
    return axios.get('/units/all', {
      params
    })
  },
  editUnit(id, payload) {
    return axios.patch(`/units/${id}`, payload)
  },
  saveUnit(payload) {
    return axios.post('/units/', payload)
  },
  saveUnitWithTenant(payload) {
    return axios.post('/units/tenant/', payload)
  },
  deleteUnit(id) {
    return axios.delete(`/units/${id}`)
  }
}
