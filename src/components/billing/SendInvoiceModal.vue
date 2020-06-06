<template>
  <v-dialog v-model="invDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text small color="primary" id="send" class="mx-0" v-on="on">
        {{ $t('dataTable.SEND_INVOICE') }}
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
          <span class="headline">Send Invoice</span>
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
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Rent*"
                    v-model="rent"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field label="Water" v-model="water"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field label="Garbage" v-model="garbage"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field label="Penalty" v-model="penalty"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Due date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Close
          </v-btn>
          <v-btn
            color="green"
            text
            @click="send"
            :disabled="invalid"
            class="btnSave"
            >{{ $t('dataTable.SEND_INVOICE') }}</v-btn
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
      rent: this.item.Tenant.rent,
      water: this.item.Tenant.water,
      penalty: this.item.Tenant.penalty,
      garbage: this.item.Tenant.garbage,
      tenant: `${this.item.Tenant.name} (${this.item.Tenant.email})`,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      invDialog: false,
      dataTableLoading: false
    }
  },

  methods: {
    ...mapActions(['sendInvoice']),
    close() {
      this.invDialog = false
    },
    async send() {
      try {
        const response = await this.$confirm(
          this.$t('invoices.DO_YOU_REALLY_WANT_TO_SEND_INVOICE_TO_TENANT'),
          {
            title: this.$t('invoices.SEND_INVOICE', [this.item.name]),
            buttonTrueText: this.$t('common.SEND'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'green',
            buttonFalseColor: 'grey lighten1'
          }
        )
        if (response) {
          const data = {
            TenantId: this.item.Tenant.id,
            UnitId: this.item.id,
            rent: this.rent,
            water: this.water || 0,
            penalty: this.penalty || 0,
            garbage: this.garbage || 0,
            dueDate: this.date
          }
          await this.sendInvoice(data)
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
