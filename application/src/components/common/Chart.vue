<template>
  <h1 xs12 text-xs-center my-2 text-uppercase>
    {{ currentFlat.name }} Dashboard
  </h1>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    currentFlat: Object
  }
}
</script>
