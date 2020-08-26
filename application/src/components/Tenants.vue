<template>
  <div>
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
              <v-toolbar-title>{{ $t('tenants.TITLE') }}</v-toolbar-title>
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
                    <v-btn color="secondary" v-on="on" class="btnNewItem pr-4">
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
                              :label="$t('tenants.headers.NAME')"
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
                              v-model="editedItem.email"
                              :label="$t('tenants.headers.EMAIL')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                        <template v-if="!editedItem.id">
                          <v-flex xs12 md6>
                            <ValidationProvider
                              rules="required|min:5"
                              v-slot="{ errors }"
                              vid="password"
                            >
                              <v-text-field
                                id="password"
                                name="password"
                                type="password"
                                :label="$t('tenants.PASSWORD')"
                                v-model="editedItem.password"
                                :error="errors.length > 0"
                                :error-messages="errors[0]"
                                key="password"
                                ref="password"
                                autocomplete="off"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-flex>
                          <v-flex xs12 md6>
                            <ValidationProvider
                              rules="required|min:5|confirmed:password"
                              v-slot="{ errors }"
                            >
                              <v-text-field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                :label="$t('tenants.CONFIRM_PASSWORD')"
                                v-model="editedItem.confirmPassword"
                                :error="errors.length > 0"
                                :error-messages="errors[0]"
                                key="confirmPassword"
                                autocomplete="off"
                              ></v-text-field>
                            </ValidationProvider>
                          </v-flex>
                        </template>
                        <v-flex xs12 md6>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              id="phone"
                              name="phone"
                              type="tel"
                              v-model="editedItem.phone"
                              :label="$t('tenants.headers.PHONE')"
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
                              clearable
                              id="rent"
                              name="rent"
                              v-model="editedItem.rent"
                              item-text="name"
                              item-value="value"
                              :label="$t('tenants.headers.RENT')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              class="inputRent"
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
          </v-layout>
        </td>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ getFormat(item.createdAt) }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ getFormat(item.updatedAt) }}
      </template>
      <template v-slot:footxer.page-text="{ pageStart, pageStop, itemsLength }">
        {{ pageStart }} - {{ pageStop }}
        {{ $t('dataTable.OF') }}
        {{ itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('tenants.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'rent']
    }
  },
  computed: {
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
          text: this.$i18n.t('tenants.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('tenants.headers.EMAIL'),
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: this.$i18n.t('tenants.headers.PHONE'),
          align: 'left',
          sortable: true,
          value: 'phone'
        },
        {
          text: this.$i18n.t('tenants.headers.RENT'),
          align: 'left',
          sortable: true,
          value: 'rent'
        },
        {
          text: this.$i18n.t('tenants.headers.DEPOSIT'),
          align: 'left',
          sortable: true,
          value: 'deposit'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.tenants.tenants
    },
    totalItems() {
      return this.$store.state.tenants.totalTenants
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
          await this.getTenants(
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
  methods: {
    ...mapActions(['getTenants', 'editTenant', 'saveTenant']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    roleName(value) {
      return value === 'admin' ? this.$t('roles.ADMIN') : this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getTenants(
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
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      try {
        this.dataTableLoading = true
        // Updating item
        if (this.editedItem.id) {
          await this.editTenant(this.editedItem)
          await this.getTenants(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        } else {
          // Creating new item
          await this.saveTenant({
            name: this.editedItem.name,
            deposit: this.editedItem.deposit,
            rent: this.editedItem.rent,
            water: this.editedItem.water
          })
          await this.getTenants(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
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
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
