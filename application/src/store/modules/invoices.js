import * as types from '@/store/mutation-types'
import api from '@/services/api/invoices'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  invoices: (state) => state.invoices,
  totalInvoices: (state) => state.totalInvoices
}

const actions = {
  getInvoices({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getInvoices(payload)
        .then((response) => {
          if (response.status === 200) {
            commit(types.INVOICES, response.data)
            commit(types.TOTAL_INVOICES, response.data.length)
            resolve()
          }
        })
        .catch((error) => {
          handleError(error, commit, reject)
        })
    })
  },

  sendInvoice({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        rent: payload.rent,
        garbage: payload.garbage,
        penalty: payload.penalty,
        water: payload.water,
        UnitId: payload.UnitId,
        dueDate: payload.dueDate,
        TenantId: payload.TenantId
      }
      api
        .sendInvoice(data)
        .then((response) => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SENT_SUCCESSFULLY'
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

  sendInvoiceReminder({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        message: payload.message,
        InvoiceId: payload.InvoiceId
      }
      api
        .sendInvoiceReminder(data)
        .then((response) => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SENT_SUCCESSFULLY'
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
  [types.INVOICES](state, invoices) {
    state.invoices = invoices
  },
  [types.TOTAL_INVOICES](state, value) {
    state.totalInvoices = value
  }
}

const state = {
  invoices: [],
  totalInvoices: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
