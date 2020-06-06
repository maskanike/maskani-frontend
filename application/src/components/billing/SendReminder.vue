<template>
  <v-dialog v-model="invDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text small color="warning" id="send" class="mx-0" v-on="on">
        {{ $t('dataTable.SEND_REMINDER') }}
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
          <span class="headline">Send Invoice Reminder</span>
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
                  label="Rent"
                  v-model="rent"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Water"
                  v-model="water"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Garbage"
                  v-model="garbage"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Penalty"
                  v-model="penalty"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="message"
                  label="Reminder Message"
                  prepend-icon="message"
                  v-on="on"
                ></v-textarea>
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
            >{{ $t('dataTable.SEND_REMINDER') }}</v-btn
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
      message: '',
      modal: false,
      invDialog: false,
      dataTableLoading: false
    }
  },

  methods: {
    ...mapActions(['sendInvoiceReminder']),
    close() {
      this.invDialog = false
      setTimeout(() => {
        this.message = ''
      }, 300)
    },
    async send() {
      try {
        const response = await this.$confirm(
          this.$t('invoices.DO_YOU_REALLY_WANT_TO_SEND_REMINDER_TO_TENANT'),
          {
            title: this.$t('invoices.SEND_REMINDER', [this.item.name]),
            buttonTrueText: this.$t('common.SEND'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'green',
            buttonFalseColor: 'grey lighten1'
          }
        )
        if (response) {
          const data = {
            InvoiceId: this.item.Tenant.lastInvoiceSentId,
            message: this.message
          }
          await this.sendInvoiceReminder(data)
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
