import axios from 'axios'

export default {
  userRegister(payload) {
    return axios.post('/register', payload)
  }
}
