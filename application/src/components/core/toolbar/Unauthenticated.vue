<template>
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
            :to="{ name: 'landing' }"
            tag="span"
            style="cursor: pointer;"
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
      </v-toolbar-items>
    </v-app-bar>
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
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ResizeText from 'vue-resize-text'
import { mapGetters } from 'vuex'

export default {
  name: 'UnauthenticatedToolbar',
  directives: {
    ResizeText
  },
  data() {
    return {
      sidebar: false,
      publicPath: process.env.BASE_URL,
      menuItems: [
        {
          title: this.$t('menuItems.HOME'),
          link: 'landing'
          // icon: 'mdi-home'
        },
        {
          title: this.$t('menuItems.ABOUT'),
          link: 'about',
          // icon: 'mdi-help-circle-outline',
          class: 'btnAbout'
        },
        {
          title: this.$t('menuItems.LOGIN'),
          link: 'login',
          // icon: 'mdi-lock',
          class: 'btnLogin'
        },
        {
          title: this.$t('menuItems.SIGNUP'),
          link: 'register',
          // icon: 'mdi-plus-circle-outline',
          class: 'btnLogin'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['appTitle'])
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
