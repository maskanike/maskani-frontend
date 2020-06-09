<template>
  <v-footer class="d-block text-center" app>
    <div>
      v{{ appVersion }} - {{ $t('footer.MADE_WITH') }}
      <v-icon small class="red--text mx-0 px-0">mdi-cards-heart</v-icon>
      &nbsp;{{ $t('footer.BY') }}: Maskani Team
    </div>
    <div>
      <div class="container-fluid">
        <div class="container">
          <div class="text-center copyright">
            <p>
              © Maskani - 2020. All Rights Reserved &nbsp;
              <a class="footer_links #{activeClass}" href="/terms-of-service">
                Terms of Service
              </a>
              <a class="footer_links #{activeClass}" href="/privacy-policy">
                Privacy Policy
              </a>
              <a class="footer_links #{activeClass}" href="/about">About</a>
              <a class="footer_links #{activeClass}" href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <a href="https://maskani.co.ke">https://maskani.co.ke</a> -->
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
