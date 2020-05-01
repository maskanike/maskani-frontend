import axios from 'axios'

export default {
  getAllFlats() {
    return axios.get('/flats/all')
  }
}
