import * as types from '@/store/mutation-types'
import api from '@/services/api/units'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  units: (state) => state.units,
  totalUnits: (state) => state.totalUnits
}

const actions = {
  getUnits({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getUnits(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.UNITS, response.data)
            commit(types.TOTAL_UNITS, response.data.length)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editUnit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name
      }
      api
        .editUnit(payload.id, data)
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
  saveUnit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveUnit(payload)
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
  deleteUnit({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteUnit(payload)
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
  [types.UNITS](state, units) {
    state.units = units
  },
  [types.TOTAL_UNITS](state, value) {
    state.totalUnits = value
  }
}

const state = {
  units: [],
  totalUnits: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
