<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const items = ref([
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Employees', icon: 'mdi-account-group', route: '/employees' }
])
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list>
          <RouterLink v-for="item in items" :key="item.title" :to="item.route"
            style="text-decoration: none; color: inherit;">
            <v-list-item>
              <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.route"></v-list-item>
            </v-list-item>
          </RouterLink>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped></style>
