<template>
  <v-flex xs12 text-xs-center my-4 text-uppercase v-html="title"></v-flex>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    title: String
  }
}
</script>
