<template>
  <v-layout>
    <v-flex xs12 sm12 md4 mt-3 pl-4>
      <div class="text-left">
        <v-toolbar-title>{{ $t('flats.ADD_NEW_FLAT') }}</v-toolbar-title>
      </div>
      <div class="text-right">
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
                    {{ $t('dataTable.NEW_FLAT_ITEM') }}
                  </v-btn>
                </div>
              </template>
              <v-card class="elevation-12">
                <v-card-title>
                  <span class="headline">{{
                    $t('dataTable.NEW_FLAT_ITEM')
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 md6>
                        <ValidationProvider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            id="name"
                            name="name"
                            prepend-icon="home"
                            v-model="flatName"
                            :label="$t('flats.headers.NAME')"
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
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CreateFlat',
  data() {
    return {
      flatName: '',
      delayTimer: null,
      dialog: false
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['saveUserFlat']),
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.flatName = ''
      }, 300)
    },
    async save() {
      try {
        const { flatName } = this
        // Creating new item
        await this.saveUserFlat({ userId: this.user.id, name: flatName })
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
