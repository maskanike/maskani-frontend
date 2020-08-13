<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card v-if="currentFlat.name">
          <v-tabs v-model="tab" background-color="info" dark>
            <v-tab key="all_units">
              All Units
            </v-tab>
            <v-tab key="overdue">
              Overdue Invoices
            </v-tab>
            <v-tab key="paid">
              Paid Invoices
            </v-tab>
            <v-tab key="all_past">
              All Past Invoices
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
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
                        <v-toolbar-title>
                          {{ $t('invoices.TENANT_TITLE') }}
                        </v-toolbar-title>
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
                                {{ $t('dataTable.NEW_UNIT') }}
                              </v-btn>
                            </div>
                          </template>
                          <v-card class="elevation-12">
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
                                        {{ getFormat(editedTenant.createdAt) }}
                                      </div>
                                    </v-flex>
                                    <v-flex xs12 md4>
                                      <label for="updatedAt">{{
                                        $t('common.UPDATED')
                                      }}</label>
                                      <div name="updatedAt">
                                        {{ getFormat(editedTenant.updatedAt) }}
                                      </div>
                                    </v-flex>
                                  </template>
                                </v-layout>
                                <v-divider v-if="editedItem.id"></v-divider>
                                <v-layout wrap>
                                  <v-flex xs12 md12>
                                    <ValidationProvider
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        v-if="editedItem.id"
                                        id="unit"
                                        name="unit"
                                        prepend-icon="home"
                                        v-model="editedItem.name"
                                        :label="
                                          $t('invoices.headers.UNIT_NAME')
                                        "
                                        disabled
                                      ></v-text-field>
                                      <v-text-field
                                        v-else
                                        id="unit"
                                        name="unit"
                                        prepend-icon="home"
                                        v-model="editedItem.name"
                                        :label="
                                          $t('invoices.headers.UNIT_NAME')
                                        "
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout wrap>
                                  <v-flex xs12 md12>
                                    <v-switch
                                      v-if="!editedItem.id"
                                      v-model="occupied"
                                      :label="`Is the new unit occupied?`"
                                    ></v-switch>
                                  </v-flex>
                                </v-layout>
                                <v-layout wrap v-if="occupied">
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="name"
                                        name="name"
                                        prepend-icon="person"
                                        v-model="editedTenant.name"
                                        :label="
                                          $t('invoices.headers.FULL_NAME')
                                        "
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="required|email"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="email"
                                        name="email"
                                        type="email"
                                        prepend-icon="email"
                                        v-model="editedTenant.email"
                                        :label="$t('invoices.headers.EMAIL')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        prepend-icon="phone"
                                        v-model="editedTenant.phone"
                                        :label="$t('invoices.headers.PHONE')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                </v-layout>
                                <v-layout wrap v-if="occupied">
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="required:integer"
                                      v-slot="{ errors }"
                                      vid="rent"
                                    >
                                      <v-text-field
                                        id="rent"
                                        name="rent"
                                        type="number"
                                        prefix="KES"
                                        :label="$t('invoices.headers.RENT')"
                                        v-model="editedTenant.rent"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        key="rent"
                                        ref="rent"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="integer"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="garbage"
                                        name="garbage"
                                        type="number"
                                        prefix="KES"
                                        v-model="editedTenant.garbage"
                                        :label="$t('invoices.headers.GARBAGE')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="integer"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="water"
                                        name="water"
                                        type="number"
                                        prefix="KES"
                                        v-model="editedTenant.water"
                                        :label="$t('invoices.headers.WATER')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                  <v-flex xs12 md6>
                                    <ValidationProvider
                                      rules="integer"
                                      v-slot="{ errors }"
                                    >
                                      <v-text-field
                                        id="penalty"
                                        name="penalty"
                                        type="number"
                                        prefix="KES"
                                        v-model="editedTenant.penalty"
                                        :label="$t('invoices.headers.PENALTY')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        autocomplete="off"
                                      ></v-text-field>
                                    </ValidationProvider>
                                  </v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-layout wrap>
                                  <v-flex xs12 md6 v-if="editedItem.id">
                                    <ValidationProvider
                                      rules="required"
                                      v-slot="{ errors }"
                                    >
                                      <v-select
                                        clearable
                                        id="status"
                                        name="status"
                                        v-model="editedTenant.status"
                                        :items="unitActions"
                                        item-text="name"
                                        item-value="text"
                                        :label="$t('billing.headers.STATUS')"
                                        :error="errors.length > 0"
                                        :error-messages="errors[0]"
                                        class="inputStatus"
                                      ></v-select>
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
                <template v-slot:item.id="{ item }">
                  <td class="fill-height px-0">
                    <v-layout class="justify-center">
                      <RecordPayment
                        v-if="item.Tenant && !invoiceNotSentToday(item)"
                        :item="item"
                        @refreshUnitsTable="refreshTable()"
                      ></RecordPayment>
                      <SendReminder
                        v-if="item.Tenant && !invoiceNotSentToday(item)"
                        :item="item"
                        @refreshUnitsTable="refreshTable()"
                      ></SendReminder>
                      <SendInvoiceModal
                        v-if="item.Tenant && invoiceNotSentToday(item)"
                        :item="item"
                        @refreshUnitsTable="refreshTable()"
                      ></SendInvoiceModal>
                      <AssignTenantToUnit
                        v-else-if="!item.Tenant"
                        :UnitId="item.id"
                        @refreshUnitsTable="refreshTable()"
                      ></AssignTenantToUnit>
                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon>mdi-menu-down</v-icon>
                          </v-btn>
                        </template>
                        <v-list v-if="item.Tenant">
                          <v-list-item
                            v-for="(action, index) in unitWithTenantActions"
                            :key="index"
                            class="mx-0"
                            id="action.id"
                            @click="triggerClick(action.id, item)"
                          >
                            <v-list-item-title>
                              {{ action.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                        <v-list v-else>
                          <v-list-item
                            v-for="(action, index) in unitWithoutTenantActions"
                            :key="index"
                            class="mx-0"
                            id="action.id"
                            @click="triggerClick(action.id, item)"
                          >
                            <v-list-item-title>
                              {{ action.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
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
                <template v-slot:no-data>
                  {{ $t('dataTable.NO_DATA') }}
                </template>
                <template v-slot:no-results>
                  {{ $t('dataTable.NO_RESULTS') }}
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>overdue invoices show up here</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>receipts show up here</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>all paid and unpaid invoices here</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <ErrorMessage />
          <SuccessMessage />
        </v-card>
        <v-card v-else>
          <CreateFlat />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
import SendInvoiceModal from './SendInvoiceModal'
import SendReminder from './SendReminder'
import RecordPayment from './RecordPayment'
import AssignTenantToUnit from './AssignTenantToUnitModal'
import { differenceInHours, parseISO } from 'date-fns'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('invoices.TENANT_TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      vacateDialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      editedTenant: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'email', 'phone'],
      unitWithTenantActions: [
        { title: 'Edit Tenant', id: 'edit' },
        { title: 'Delete Tenant', id: 'delete' },
        { title: 'Vacate Unit', id: 'vacate' },
        { title: 'Move Tenant to other Unit', id: 'migrate' }
      ],
      unitWithoutTenantActions: [{ title: 'Delete Unit', id: 'deleteUnit' }],
      occupied: true,
      tab: 'all_units'
    }
  },
  computed: {
    unitActions() {
      return [
        { name: this.$t('billing.UNCHANGED'), value: 'unchanged' },
        { name: this.$t('billing.MOVED_OUT'), value: 'moved_out' },
        { name: this.$t('billing.CHANGED_HOUSE'), value: 'changed_house' }
      ]
    },
    emptyUnits() {
      return this.$store.state.units.emptyUnits
    },
    formTitle() {
      return this.editedItem.id
        ? this.$t('dataTable.EDIT_UNIT')
        : this.$t('dataTable.NEW_UNIT')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('invoices.headers.UNIT'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('invoices.headers.FULL_NAME'),
          align: 'left',
          sortable: true,
          value: 'Tenant.name'
        },
        {
          text: this.$i18n.t('invoices.headers.EMAIL'),
          align: 'left',
          sortable: true,
          value: 'Tenant.email'
        },
        {
          text: this.$i18n.t('invoices.headers.PHONE'),
          align: 'left',
          sortable: true,
          value: 'Tenant.phone'
        },
        {
          text: this.$i18n.t('invoices.headers.RENT'),
          align: 'left',
          sortable: true,
          value: 'Tenant.rent'
        },
        {
          text: this.$i18n.t('invoices.headers.WATER'),
          align: 'left',
          sortable: true,
          value: 'Tenant.water'
        },
        {
          text: this.$i18n.t('invoices.headers.GARBAGE'),
          align: 'left',
          sortable: true,
          value: 'Tenant.garbage'
        },
        {
          text: this.$i18n.t('invoices.headers.PENALTY'),
          align: 'left',
          sortable: true,
          value: 'Tenant.penalty'
        },
        {
          text: this.$i18n.t('invoices.headers.LAST_INVOICE'),
          align: 'left',
          sortable: true,
          value: 'Tenant.lastInvoiceSentAt'
        },
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: 'id',
          sortable: false,
          width: 100
        }
      ]
    },
    currentFlat() {
      return this.$store.state.flats.currentFlat
    },
    items() {
      return this.$store.state.units.units
    },
    totalItems() {
      return this.$store.state.units.totalUnits
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    vacateDialog(value) {
      return value ? true : this.vacateDialog()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.refreshTable()
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
  methods: {
    ...mapActions([
      'getUnits',
      'editTenant',
      'saveUnitWithTenant',
      'saveUnit',
      'deleteTenant',
      'deleteUnit',
      'offboardTenant',
      'getUserFlat'
    ]),
    getFormat(date) {
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
        await this.refreshTable()
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

    invoiceNotSentToday(item) {
      const lastInv = item.Tenant.lastInvoiceSentAt
      if (!lastInv) {
        return true
      }

      const now = new Date()
      const hoursDiff = differenceInHours(now, parseISO(lastInv))
      if (hoursDiff > 24) {
        return true
      }
      return false
    },

    triggerClick(action, item) {
      if (action === 'edit') {
        this.editItem(item)
      } else if (action === 'delete') {
        this.deleteTenantItem(item.id)
      } else if (action === 'deleteUnit') {
        this.deleteUnitItem(item.id)
      } else if (action === 'vacate') {
        this.vacateUnitAction(item.Tenant.id)
      }
    },

    async refreshTable() {
      await this.getUnits(
        buildPayloadPagination(this.pagination, this.buildSearch())
      )
    },

    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.editedTenant = Object.assign({}, item.Tenant, { UnitId: item.id })
      this.dialog = true
    },

    async deleteTenantItem(tenantId) {
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
          await this.deleteTenant(tenantId)
          await this.refreshTable()
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },

    async deleteUnitItem(unitId) {
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
          await this.deleteUnit(unitId)
          await this.refreshTable()
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },

    async vacateUnitAction(tenantId) {
      try {
        const response = await this.$confirm(
          this.$t('billing.DO_YOU_REALLY_WANT_TO_VACATE_UNIT'),
          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.SEND'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'green lighten3',
            buttonFalseColor: 'yellow'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.offboardTenant({ id: tenantId })
          await this.refreshTable()
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedTenant = Object.assign({}, this.defaultItem)
      }, 300)
    },
    vacateClose() {
      this.vacateDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedTenant = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async saveUnitAndTenantIfExists() {
      if (this.occupied) {
        // Creating new unit with a tenant
        await this.saveUnitWithTenant({
          unitName: this.editedItem.name,
          name: this.editedTenant.name,
          email: this.editedTenant.email,
          phone: this.editedTenant.phone,
          rent: this.editedTenant.rent,
          water: this.editedTenant.water || 0,
          penalty: this.editedTenant.penalty || 0,
          garbage: this.editedTenant.garbage || 0
        })
      } else {
        await this.saveUnit({ name: this.editedItem.name })
      }
    },
    async save() {
      try {
        this.dataTableLoading = true
        // Updating item
        if (this.editedItem.id) {
          const data = { ...this.editedTenant, UnitId: this.editedItem.id }
          await this.editTenant(data)
          await this.refreshTable()
          this.dataTableLoading = false
        } else {
          await this.saveUnitAndTenantIfExists()
          await this.refreshTable()
          this.dataTableLoading = false
        }
        this.close()
        return
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getUserFlat()
  },
  components: {
    SendInvoiceModal,
    AssignTenantToUnit,
    SendReminder,
    RecordPayment
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
