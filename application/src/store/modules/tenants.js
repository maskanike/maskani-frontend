import * as types from '@/store/mutation-types'
import api from '@/services/api/tenants'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  tenants: (state) => state.tenants,
  totalTenants: (state) => state.totalTenants
}

const actions = {
  getTenants({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getTenants(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.TENANTS, response.data)
            commit(types.TOTAL_TENANTS, response.data.length)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },
  editTenant({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        UnitId: payload.UnitId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        rent: payload.rent,
        garbage: payload.garbage || 0,
        water: payload.water || 0,
        penalty: payload.penalty || 0
      }
      api
        .editTenant(payload.id, data)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.EDITED_SUCCESSFULLY'
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
  saveTenant({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveTenant(payload)
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
  deleteTenant({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteTenant(payload)
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
  },
  movedOutTenant({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        id: payload.TenantId
      }
      api
        .tenantMovedOut(data)
        .then((response) => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.TENANT_VACATED'
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
  [types.TENANTS](state, tenants) {
    state.tenants = tenants
  },
  [types.TOTAL_TENANTS](state, value) {
    state.totalTenants = value
  }
}

const state = {
  tenants: [],
  totalTenants: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
