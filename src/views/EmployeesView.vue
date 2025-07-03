<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert v-if="error" type="error" class="mb-4">
                    {{ error }}
                </v-alert>
            </v-col>
        </v-row>

        <v-row v-if="loading">
            <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                <v-skeleton-loader type="card" />
            </v-col>
        </v-row>

        <v-row v-else-if="employees.length === 0 && !loading && !error">
            <v-col cols="12">
                <v-alert type="info">No employees found.</v-alert>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4">
                <v-card>
                    <v-card-title>
                        {{ employee.firstName }} {{ employee.lastName }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ employee.gender === 'male' ? 'Male' : 'Female' }}
                    </v-card-subtitle>
                    <v-card-text>
                        <div><strong>Birth Date:</strong> {{ employee.birthDate }}</div>
                        <div><strong>Passport:</strong> {{ employee.passport }}</div>
                        <div>
                            <v-chip :color="employee.active ? 'green' : 'red'" dark>
                                {{ employee.active ? 'Active' : 'Inactive' }}
                            </v-chip>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-pagination v-model="page" :length="Math.ceil(total / 12)" :total-visible="7" color="primary" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const router = useRouter()
const page = ref(Number(route.query.page) || 1)
const employeeStore = useEmployeeStore()
const { employees, total, loading, error } = storeToRefs(employeeStore)

watch(employees, (val) => { console.log('Employees updated:', val) })

watch(page, (newPage) => {
    router.replace({ query: { ...route.query, page: newPage } })
    employeeStore.fetchEmployees(newPage)
})

watch(
    () => route.query.page,
    (newPage) => {
        if (Number(newPage) !== page.value) {
            page.value = Number(newPage) || 1
            employeeStore.fetchEmployees(page.value)
        }
    }
)

onMounted(() => {
    employeeStore.fetchEmployees(page.value)
})
</script>

<style scoped></style>