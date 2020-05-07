import * as types from '@/store/mutation-types'
import api from '@/services/api/flats'
import { handleError } from '@/utils/utils.js'

const getters = {
  allFlats: (state) => state.allFlats,
  currentFlat: (state) => state.currentFlat
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
  },
  getUserFlat({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getUserFlat()
        .then((response) => {
          if (response.status === 200) {
            commit(types.CURRENT_FLAT, response.data)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  addUnitData({ commit }, data) {
    commit(types.ADD_UNIT_DATA, data)
  }
}

const mutations = {
  [types.FILL_ALL_FLATS](state, flats) {
    state.allFlats = flats
  },
  [types.CURRENT_FLAT](state, flat) {
    state.currentFlat = flat
  },
  [types.ADD_UNIT_DATA](state, data) {
    switch (data.key) {
      case 'name':
        state.flats.name = data.value
        break
      case 'bankDetails':
        state.flats.bankDetails = data.value
        break
      default:
        break
    }
  }
}

const state = {
  allFlats: [],
  currentFlat: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
