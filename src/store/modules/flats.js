import * as types from '@/store/mutation-types'
import api from '@/services/api/flats'
import { handleError } from '@/utils/utils.js'

const getters = {
  allFlats: (state) => state.allFlats
}

const actions = {
  getAllFlats({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllFlats()
        .then((response) => {
          if (response.status === 200) {
            const flats = []
            const array = response.data
            array.forEach((element) => {
              flats.push(element.name)
            })
            commit(types.FILL_ALL_FLATS, flats)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.FILL_ALL_FLATS](state, flats) {
    state.allFlats = flats
  }
}

const state = {
  allFlats: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
