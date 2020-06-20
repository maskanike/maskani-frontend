<template>
  <v-dialog v-model="invDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text small color="warning" id="send" class="mx-0" v-on="on">
        Record Payment
      </v-btn>
    </template>
    <v-card>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
      >
        <v-card-title>
          <span class="headline">Record Payment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Tenant"
                  v-model="tenant"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Amount Paod"
                  v-model="amout"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Close
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="send"
            :disabled="invalid"
            class="btnSave"
            >Record Payment</v-btn
          >
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: Object
  },
  data() {
    return {
      tenant: `${this.item.Tenant.name} (${this.item.Tenant.email})`,
      amount: 0,
      modal: false,
      invDialog: false,
      dataTableLoading: false
    }
  },

  methods: {
    ...mapActions(['recordPayment']),
    close() {
      this.invDialog = false
      setTimeout(() => {
        this.message = ''
      }, 300)
    },
    async send() {
      try {
        const response = await this.$confirm(
          `Are you sure you want to record ${this.amount} paid by ${this.tenant}`,
          {
            title: 'Make Payment',
            buttonTrueText: this.$t('common.SEND'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'green',
            buttonFalseColor: 'grey lighten1'
          }
        )
        if (response) {
          const data = {
            InvoiceId: this.item.Tenant.lastInvoiceSentId,
            amount: this.amount
          }
          await this.recordPayment(data)
          this.$emit('refreshUnitsTable')
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.close()
      }
    }
  }
}
</script>
