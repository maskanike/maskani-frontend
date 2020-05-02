import axios from 'axios'

export default {
  getInvoices(params) {
    return axios.get('/invoices', {
      params
    })
  },
  editInvoice(id, payload) {
    return axios.patch(`/invoices/${id}`, payload)
  },
  sendInvoice(tenantId, payload) {
    return axios.post(`/invoices/${tenantId}`, payload)
  },
  deleteInvoice(id) {
    return axios.delete(`/invoices/${id}`)
  }
}
