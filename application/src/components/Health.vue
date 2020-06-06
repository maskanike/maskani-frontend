<template>
  <section class="section">
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Health',
  data() {
    return {
      msg: `${process.env.NODE_ENV} env is healthy`,
    };
  },
};
</script>
