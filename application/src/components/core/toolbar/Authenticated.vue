<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      overflow
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="{ name: item.link }"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="{ name: item.link }" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#f5f5f5">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
        <router-link :to="{ name: 'home' }" tag="span" style="cursor: pointer;">
          <v-img :src="`${publicPath}img/logoA.svg`" width="250px"></v-img>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large>
        <router-link
          :to="{ name: 'profile' }"
          tag="span"
          style="cursor: pointer;"
        >
          <v-icon>mdi-account</v-icon>
        </router-link>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    publicPath: process.env.BASE_URL,
    items: [
      { icon: 'mdi-keyboard', text: 'Dashboard', link: 'home' },
      { icon: 'mdi-history', text: 'Billing', link: 'billing' },
      { icon: 'mdi-content-copy', text: 'Manage', link: 'manage' }
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',
      //   text: 'Reports',
      //   model: true,
      //   children: [
      //     { icon: 'mdi-user', text: 'Tenants' },
      //     { icon: 'mdi-house', text: 'Flat' },
      //     { icon: 'mdi-dollars', text: 'Finances' }
      //   ]
      // },
      // { icon: 'mdi-account-cog', text: 'Settings', link: 'settings' },
      // { icon: 'mdi-message', text: 'Send feedback', link: 'feedback' },
      // { icon: 'mdi-help-circle', text: 'Help', link: 'help' }
    ]
  }),
  methods: {
    ...mapActions(['userLogout']),
    logout() {
      this.userLogout()
      // this.$store.dispatch('userLogout')
    }
  }
}
</script>
