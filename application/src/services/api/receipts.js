import axios from 'axios'

export default {
  getReceipts(params) {
    return axios.get('/receipts', {
      params
    })
  },
  postReceipt(payload) {
    return axios.post(`/receipts/`, payload)
  }
}
