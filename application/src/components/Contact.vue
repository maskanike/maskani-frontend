<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('contact.TITLE')" />
      <Description :description="$t('contact.DESCRIPTION')" />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('contact.TITLE')} - %s`
    }
  }
}
</script>
