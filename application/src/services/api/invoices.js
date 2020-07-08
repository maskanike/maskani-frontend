import axios from 'axios'

export default {
  getInvoices(params) {
    return axios.get('/invoices', {
      params
    })
  },
  sendInvoice(payload) {
    return axios.post(`/invoices/`, payload)
  },
  sendInvoiceReminder(payload) {
    return axios.post(`/invoices/reminder`, payload)
  }
}
