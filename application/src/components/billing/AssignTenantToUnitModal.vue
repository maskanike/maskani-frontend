<template>
  <v-dialog v-model="tenantDiag" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn text small color="primary" id="send" class="mx-0" v-on="on">
        {{ $t('dataTable.CREATE_TENANT') }}
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
          <span class="headline">Create Tenant</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="name"
                    name="name"
                    :label="$t('invoices.headers.FULL_NAME')"
                    v-model="name"
                    prepend-icon="person"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    prepend-icon="email"
                    v-model="email"
                    :label="$t('invoices.headers.EMAIL')"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    id="phone"
                    name="phone"
                    type="tel"
                    prepend-icon="phone"
                    v-model="phone"
                    :label="$t('invoices.headers.PHONE')"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Rent*"
                    v-model="rent"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Water" v-model="water"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Garbage" v-model="garbage"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Penalty" v-model="penalty"></v-text-field>
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
            color="green"
            text
            @click="save"
            :disabled="invalid"
            class="btnSave"
            >{{ $t('dataTable.SAVE') }}
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    UnitId: Number
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      rent: 0,
      water: 0,
      penalty: 0,
      garbage: 0,
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      tenantDiag: false,
      dataTableLoading: false
    }
  },

  methods: {
    ...mapActions(['saveTenant']),
    close() {
      this.tenantDiag = false
    },
    async save() {
      try {
        const response = await this.$confirm(
          this.$t('invoices.DO_YOU_REALLY_WANT_TO_SAVE_TENANT'),
          {
            title: this.$t('invoices.SAVE_TENANT', [this.name]),
            buttonTrueText: this.$t('common.SAVE'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'green',
            buttonFalseColor: 'grey lighten1'
          }
        )
        if (response) {
          const data = {
            UnitId: this.UnitId,
            name: this.name,
            phone: this.phone,
            email: this.email,
            rent: this.rent,
            water: this.water || 0,
            penalty: this.penalty || 0,
            garbage: this.garbage || 0
          }
          await this.saveTenant(data)
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
