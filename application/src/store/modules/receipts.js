import * as types from '@/store/mutation-types'
import api from '@/services/api/receipts'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  receipts: (state) => state.receipts,
  totalReceipts: (state) => state.totalReceipts
}

const actions = {
  getReceipts({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getReceipts(payload)
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

  recordPayment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        amount: payload.amount,
        TenantId: payload.TenantId,
        InvoiceId: payload.InvoiceId
      }
      api
        .postReceipt(data)
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
  [types.INVOICES](state, receipts) {
    state.receipts = receipts
  },
  [types.TOTAL_INVOICES](state, value) {
    state.totalReceipts = value
  }
}

const state = {
  receipts: [],
  totalReceipts: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
