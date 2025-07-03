<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-skeleton-loader v-if="loading" type="card" />
                <v-alert v-else-if="error" type="error">{{ error }}</v-alert>
                <v-card v-else-if="employee" class="pa-4" elevation="8">
                    <v-row align="center" no-gutters>
                        <v-col cols="auto">
                            <v-avatar size="96" class="mr-4">
                                <v-icon icon="mdi-account-circle" color="primary" size="96"></v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col>
                            <div class="d-flex align-center">
                                <span class="text-h5 font-weight-bold">
                                    {{ employee.firstName }} {{ employee.lastName }}
                                </span>
                                <v-chip :color="employee.active ? 'green' : 'red'" class="ml-3" dark>
                                    {{ employee.active ? 'Active' : 'Inactive' }}
                                </v-chip>
                            </div>
                            <div class="grey--text text--darken-1 mt-1">
                                <v-icon color="primary" small class="mr-1">mdi-card-account-details</v-icon>
                                {{ employee.passport }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="my-4" />
                    <v-card-text>
                        <div class="d-flex align-center mb-2">
                            <v-icon color="primary" class="mr-2">mdi-cake-variant</v-icon>
                            <strong>Birth Date:</strong> {{ employee.birthDate }}
                        </div>
                        <div class="d-flex align-center mb-2">
                            <v-icon color="primary" class="mr-2">mdi-gender-male-female</v-icon>
                            <strong>Gender:</strong> {{ employee.gender === 'male' ? 'Male' : 'Female' }}
                        </div>
                    </v-card-text>
                </v-card>
                <v-alert v-else type="info">Employee not found.</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()
const { employee, loading, error } = storeToRefs(employeeStore)

onMounted(() => {
    if (route.params.id) {
        employeeStore.fetchEmployee(route.params.id)
    }
})
</script>

<style scoped>
.v-card {
    border-radius: 18px;
}
</style>