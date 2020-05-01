import axios from 'axios'

export default {
  getInvoices(params) {
    return axios.get('/invoices', {
      params
    })
  },
  editInvoices(id, payload) {
    return axios.patch(`/invoices/${id}`, payload)
  },
  saveInvoices(payload) {
    return axios.post('/invoices/', payload)
  },
  deleteInvoices(id) {
    return axios.delete(`/invoices/${id}`)
  }
}
