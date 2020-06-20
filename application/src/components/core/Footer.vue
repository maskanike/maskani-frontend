<template>
  <v-footer app>
    <v-container fluid>
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
    </v-container>
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
