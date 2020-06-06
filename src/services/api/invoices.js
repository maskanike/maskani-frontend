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
  sendInvoiceReminder(invoiceId, payload) {
    return axios.post(`/invoices/${invoiceId}/reminder`, payload)
  },
  deleteInvoice(id) {
    return axios.delete(`/invoices/${id}`)
  }
}
