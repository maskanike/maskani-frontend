<template>
  <v-dialog v-model="invDialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text small color="primary" id="send" class="mx-0" v-on="on">
        {{ $t('dataTable.SEND_INVOICE') }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Send Invoice</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Tenant"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Rent*"
                v-model="rent"
                required
              ></v-text-field>
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
                    label="Picker in dialog"
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
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
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
        <v-btn color="blue darken-1" text @click="invDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="send">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      rent: this.item.rent,
      water: 0,
      penalty: 0,
      garbage: 0,
      tenantName: '',
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      invDialog: false,
      dataTableLoading: false
    }
  },

  methods: {
    async send() {
      try {
        this.dataTableLoading = true
        await this.sendInvoice({
          tenantId: this.tenantId,
          rent: this.rent,
          water: this.water || 0,
          penalty: this.penalty || 0,
          garbage: this.garbage || 0
        })
        this.dataTableLoading = false
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  }
}
</script>
