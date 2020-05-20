<template v-slot:activator="{ on }">
  <div v-if="isTokenSet">
    <Authenticated />
  </div>
  <div v-else>
    <Unauthenticated />
  </div>
</template>

<script>
import Authenticated from './Authenticated'
import Unauthenticated from './Unauthenticated'
import { mapGetters } from 'vuex'
import ResizeText from 'vue-resize-text'

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.$store.getters.appTitle
        },
        { name: 'application-name', content: this.$store.getters.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  directives: {
    ResizeText
  },
  data() {
    return {
      sidebar: false,
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    ...mapGetters(['appTitle', 'isTokenSet', 'user']),
    admin() {
      return this.user !== null ? this.user.role === 'admin' : false
    },
    adminItems() {
      return [
        {
          title: this.$t('adminItems.FLATS'),
          link: 'admin-flats',
          icon: 'mdi-home',
          class: 'btnAdminFlats'
        },
        {
          title: this.$t('adminItems.USERS'),
          link: 'admin-users',
          icon: 'mdi-account-supervisor',
          class: 'btnAdminUsers'
        }
      ]
    },
    menuItems() {
      if (this.isTokenSet) {
        return [
          {
            title: this.$t('menuItems.HOME'),
            link: 'home',
            icon: 'mdi-home',
            class: 'btnHome'
          },
          {
            title: this.$t('menuItems.INVOICES'),
            link: 'billing-invoices',
            icon: 'mdi-home',
            class: 'btnBillingInvoices'
          },
          {
            title: this.$t('menuItems.RECEIPTS'),
            link: 'billing-receipts',
            icon: 'mdi-account-supervisor',
            class: 'btnBillingReceipts'
          },
          {
            title: this.$t('menuItems.MY_PROFILE'),
            link: 'profile',
            icon: 'mdi-face',
            class: 'btnProfile'
          },
          {
            title: this.$t('menuItems.MANAGE'),
            link: 'manage',
            icon: 'mdi-home',
            class: 'btnManage'
          }
        ]
      }
      return [
        {
          title: this.$t('menuItems.HOME'),
          link: 'landing',
          icon: 'mdi-home'
        },
        {
          title: this.$t('menuItems.ABOUT'),
          link: 'about',
          icon: 'mdi-help-circle-outline',
          class: 'btnAbout'
        },
        {
          title: this.$t('menuItems.LOGIN'),
          link: 'login',
          icon: 'mdi-lock',
          class: 'btnLogin'
        },
        {
          title: this.$t('menuItems.SIGNUP'),
          link: 'register',
          icon: 'mdi-plus-circle-outline',
          class: 'btnLogin'
        }
      ]
    }
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
    }
  },
  components: {
    Authenticated,
    Unauthenticated
  }
}
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 3 auto

  .v-tab
    &::before
      display: none
</style>
