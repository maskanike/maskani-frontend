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
              <router-link
                :to="{ name: 'toc' }"
                style="footer_links #{activeClass}"
              >
                Terms of Service
              </router-link>
              <router-link
                :to="{ name: 'pp' }"
                style="footer_links #{activeClass}"
              >
                Privacy Policy
              </router-link>
              <router-link
                :to="{ name: 'about' }"
                style="footer_links #{activeClass}"
              >
                About
              </router-link>
              <router-link
                :to="{ name: 'contact' }"
                style="footer_links #{activeClass}"
              >
                Contact
              </router-link>
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
