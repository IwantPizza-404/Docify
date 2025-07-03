<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showSearch = ref(false)
const searchText = ref('')

function onSearch() {
  router.replace({ name: route.name, query: { ...route.query, search: searchText.value } })
}

const drawer = ref(false)
const items = ref([
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Employees', icon: 'mdi-account-group', route: '/employees' },
  { title: 'Documents', icon: 'mdi-file', route: '/documents' }
])
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title style="text-transform: capitalize;">{{ $route.name }}</v-toolbar-title>

        <template v-if="['employees'].includes(route.name)">
          <v-text-field v-if="showSearch" v-model="searchText" placeholder="Search..." dense hide-details single-line
            style="max-width: 200px; margin-right: 8px;" @keyup.enter="onSearch" @blur="onSearch" />
          <v-btn icon="mdi-magnify" variant="text" @click="showSearch = !showSearch"></v-btn>
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
