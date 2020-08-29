import * as types from '@/store/mutation-types'
import api from '@/services/api/adminFlats'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  flats: (state) => state.flats,
  totalFlats: (state) => state.totalFlats
}

const actions = {
  getFlats({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getFlats(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.FLATS, response.data)
            commit(types.TOTAL_FLATS, response.data.length)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editFlat({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name,
        paymentDetails: payload.paymentDetails
      }
      api
        .editFlat(payload.id, data)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  saveFlat({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveFlat(payload)
        .then((response) => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  deleteFlat({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteFlat(payload)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.DELETED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.FLATS](state, flats) {
    state.flats = flats
  },
  [types.TOTAL_FLATS](state, value) {
    state.totalFlats = value
  }
}

const state = {
  flats: [],
  totalFlats: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
