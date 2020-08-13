import axios from 'axios'

export default {
  getTenants(params) {
    return axios.get('/tenants', {
      params
    })
  },
  editTenant(id, payload) {
    return axios.patch(`/tenants/${id}`, payload)
  },
  saveTenant(payload) {
    return axios.post('/tenants/', payload)
  },
  deleteTenant(id) {
    return axios.delete(`/tenants/${id}`)
  },
  offboardTenant(payload) {
    return axios.patch('/tenants/movedout/', payload)
  }
}
