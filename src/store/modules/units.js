import * as types from '@/store/mutation-types'
import api from '@/services/api/units'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  units: (state) => state.units,
  emptyUnits: (state) => state.units.filter((unit) => !unit.Tenant),
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
            commit(types.EMPTY_UNITS, response.data)
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
  saveUnitWithTenant({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveUnitWithTenant(payload)
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
  },
  [types.EMPTY_UNITS](state, value) {
    state.emptyUnits = value.filter((unit) => !unit.Tenant)
  }
}

const state = {
  units: [],
  totalUnits: 0,
  emptyUnits: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
