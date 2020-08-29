<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('manageFlat.TITLE')" />
      <v-flex xs12 sm8 offset-sm2>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="name"
                      name="name"
                      type="text"
                      :label="$t('manageFlat.NAME')"
                      v-model="name"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex xs12 md4>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="paymentDetails"
                      name="paymentDetails"
                      type="text"
                      :label="$t('manageFlat.BANK_DETAILS')"
                      clear-icon="mdi-close"
                      clearable
                      v-model="paymentDetails"
                      :error="errors.length > 0"
                      :error-messages="errors[0]"
                      autocomplete="off"
                    ></v-text-field>
                  </ValidationProvider>
                </v-flex>
                <v-flex text-xs-center mt-5>
                  <SubmitButton
                    :buttonText="$t('manageFlat.SAVE')"
                    customClass="btnSave"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-data-table
          :loading="dataTableLoading"
          :no-data-text="$t('dataTable.NO_DATA')"
          :no-results-text="$t('dataTable.NO_RESULTS')"
          :headers="headers"
          :items="items"
          :options.sync="pagination"
          :items-per-page="5"
          :server-items-length="totalItems"
          class="elevation-1"
          :footer-props="{
            'items-per-page-text': $t('dataTable.ROWS_PER_PAGE'),
            'items-per-page-options': [5, 10, 25]
          }"
        >
          <template v-slot:top>
            <v-layout wrap>
              <v-flex xs12 sm12 md4 mt-3 pl-4>
                <div class="text-left">
                  <v-toolbar-title>{{ $t('units.TITLE') }}</v-toolbar-title>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md4 px-3>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  :label="$t('dataTable.SEARCH')"
                  id="search"
                  single-line
                  hide-details
                  clearable
                  clear-icon="mdi-close"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
                <ValidationObserver
                  ref="observer"
                  v-slot="{ invalid }"
                  tag="form"
                  @submit.prevent="submit()"
                >
                  <v-dialog
                    v-model="dialog"
                    max-width="800px"
                    content-class="dlgNewEditItem"
                  >
                    <template v-slot:activator="{ on }">
                      <div class="text-right">
                        <v-btn
                          color="secondary"
                          v-on="on"
                          class="btnNewItem pr-4"
                        >
                          <v-icon class="mr-2">mdi-plus</v-icon>
                          {{ $t('dataTable.NEW_ITEM') }}
                        </v-btn>
                      </div>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <template v-if="editedItem.id">
                              <v-flex xs12 md4>
                                <label for="createdAt">{{
                                  $t('common.CREATED')
                                }}</label>
                                <div name="createdAt">
                                  {{ getFormat(editedItem.createdAt) }}
                                </div>
                              </v-flex>
                              <v-flex xs12 md4>
                                <label for="updatedAt">{{
                                  $t('common.UPDATED')
                                }}</label>
                                <div name="updatedAt">
                                  {{ getFormat(editedItem.updatedAt) }}
                                </div>
                              </v-flex>
                              <v-flex xs12 md4>
                                <label for="verified">{{
                                  $t('units.headers.VERIFIED')
                                }}</label>
                                <div
                                  name="verified"
                                  v-html="trueFalse(editedItem.verified)"
                                ></div>
                              </v-flex>
                            </template>
                            <v-flex xs12 md6>
                              <ValidationProvider
                                rules="required"
                                v-slot="{ errors }"
                              >
                                <v-text-field
                                  id="name"
                                  name="name"
                                  v-model="editedItem.name"
                                  :label="$t('units.headers.NAME')"
                                  :error="errors.length > 0"
                                  :error-messages="errors[0]"
                                  autocomplete="off"
                                ></v-text-field>
                              </ValidationProvider>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red lighten3"
                          text
                          @click="close"
                          class="btnCancel"
                          >{{ $t('dataTable.CANCEL') }}</v-btn
                        >
                        <v-btn
                          color="green"
                          text
                          @click="save"
                          :disabled="invalid"
                          class="btnSave"
                          >{{ $t('dataTable.SAVE') }}</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </ValidationObserver>
              </v-flex>
            </v-layout>
          </template>
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ roleName(props.item.role) }}</td>
            <td v-html="trueFalse(props.item.verified)"></td>
            <td>{{ props.item.phone }}</td>
          </template>
          <template v-slot:item.id="{ item }">
            <td class="fill-height px-0">
              <v-layout class="justify-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="edit"
                      icon
                      class="mx-0"
                      v-on="on"
                      @click="editItem(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('dataTable.EDIT') }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="delete"
                      icon
                      class="mx-0"
                      v-on="on"
                      @click="deleteItem(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('dataTable.DELETE') }}</span>
                </v-tooltip>
              </v-layout>
            </td>
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ getFormat(item.createdAt) }}
          </template>
          <template v-slot:item.updatedAt="{ item }">
            {{ getFormat(item.updatedAt) }}
          </template>
          <template
            v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }"
          >
            {{ pageStart }} - {{ pageStop }}
            {{ $t('dataTable.OF') }}
            {{ itemsLength }}
          </template>
          <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
          <template v-slot:no-results>{{
            $t('dataTable.NO_RESULTS')
          }}</template>
        </v-data-table>
        <ErrorMessage />
        <SuccessMessage />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('manageFlat.TITLE')} - %s`
    }
  },
  data() {
    return {
      dialog: false,
      unit: '',
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name']
    }
  },
  computed: {
    currentFlat() {
      return this.$store.state.flats.currentFlat
    },
    name: {
      get() {
        return this.$store.state.flats.currentFlat.name
      },
      set(value) {
        const data = {
          key: 'name',
          value
        }
        this.addFlatData(data)
      }
    },
    paymentDetails: {
      get() {
        return this.$store.state.flats.currentFlat.paymentDetails
      },
      set(value) {
        const data = {
          key: 'paymentDetails',
          value
        }
        this.addFlatData(data)
      }
    },
    formTitle() {
      return this.editedItem.id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: 'id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('invoices.headers.UNIT'),
          align: 'left',
          sortable: true,
          value: 'name'
        }
      ]
    },
    items() {
      return this.$store.state.units.units
    },
    totalItems() {
      return this.$store.state.units.totalUnits
    }
  },
  methods: {
    ...mapActions(['getUnits', 'addFlatData', 'editFlat', 'getUserFlat']),
    async submit() {
      await this.editFlat({
        name: this.name,
        paymentDetails: this.paymentDetails,
        id: this.currentFlat.id
      })
    },
    close() {
      this.triggerChangePassword = false
      this.dialog = false
    },
    async save() {
      try {
        await this.changeMyPassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
      }
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getUnits(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.editedTenant = Object.assign({}, item.Tenant, { UnitId: item.id })
      this.dialog = true
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.DELETE'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteUser(item.id)
          await this.getUnits(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getUnits(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  async mounted() {
    await this.getUserFlat()
  }
}
</script>
