<template>
  <section class="section">
    <div class="hello">
      <h3>{{ msg }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Health',
  data() {
    return {
      msg: `${process.env.NODE_ENV} env is healthy`
    }
  }
}
</script>
