<template>
  <h1 xs12 text-xs-center my-4 text-uppercase v-html="title"></h1>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    title: String
  }
}
</script>
