<template v-slot:activator="{ on }">
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
      padding="2px"
      margin-bottom="3px"
    >
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </span>
      <div class="headline ml-0">
        <div v-resize-text>
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer;"
            v-if="isTokenSet"
          >
            <v-img :src="`${publicPath}img/logoA.svg`" width="250px"></v-img>
          </router-link>
          <router-link
            :to="{ name: 'landing' }"
            tag="span"
            style="cursor: pointer;"
            v-else
          >
            <v-img :src="`${publicPath}img/logoA.svg`" width="250px"></v-img>
          </router-link>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
        <v-menu v-if="admin" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="btnAdmin hidden-sm-and-down">
              <v-icon>mdi-lock</v-icon>
              &nbsp;{{ $t('adminItems.ADMIN') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in adminItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-item-icon class="mr-2">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          text
          v-if="isTokenSet"
          @click="userLogout"
          class="hidden-sm-and-down btnLogout"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          {{ $t('menuItems.LOGOUT') }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- <nav
      class="navbar align-items-center fixed-top p-2 px-md-5 mb-3 bg-white border-bottom shadow-sm"
    > -->
    <v-navigation-drawer v-model="sidebar" absolute disable-resize-watcher>
      <v-img>
        <a class="navbar-brand" href="/">
          <img
            class="brand brandA my-0 mr-md-auto font-weight-normal"
            src="${publicPath}img/logoA.svg"
          />
        </a>
      </v-img>
      <v-list>
        <v-list-item>
          <v-list-item-content>{{ appTitle }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-group v-if="admin" prepend-icon="mdi-lock" no-action>
          <v-list-item slot="activator" class="pl-0">
            <v-list-item-content>
              {{ $t('adminItems.ADMIN') }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item v-if="isTokenSet" @click="userLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{
            $t('menuItems.LOGOUT')
          }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
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
