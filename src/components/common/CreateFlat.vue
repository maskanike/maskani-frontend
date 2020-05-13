<template>
  <v-layout>
    <v-flex xs12 sm12 md4 mt-3 pl-4>
      <div class="text-left">
        <v-toolbar-title>{{ $t('invoices.ADD_NEW_FLAT') }}</v-toolbar-title>
      </div>
      <div class="text-right">
        <v-btn color="secondary" v-on="on" class="btnNewItem pr-4">
          <v-icon class="mr-2">mdi-plus</v-icon>
          {{ $t('dataTable.NEW_FLAT_ITEM') }}
        </v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'CreateFlat'
}
</script>
