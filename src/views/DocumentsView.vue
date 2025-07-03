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

        <v-row v-else-if="documents.length === 0 && !loading && !error">
            <v-col cols="12">
                <v-alert type="info">No documents found.</v-alert>
            </v-col>
        </v-row>

        <div v-else>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-select v-model="selectedEmployee" :items="employees" item-title="firstName" item-value="id"
                        label="Filter by employee" clearable dense hide-details :return-object="false"
                        :menu-props="{ maxHeight: '300px' }" />
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="doc in documents.filter(Boolean)" :key="doc.id" cols="12" sm="6" md="6">
                    <v-card @click="$router.push(`/documents/${doc.id}`)" class="pa-4" style="height: 100%;">
                        <div class="d-flex align-center mb-2">
                            <v-avatar color="primary" size="40" class="mr-3">
                                <v-icon color="white">mdi-file-document-outline</v-icon>
                            </v-avatar>
                            <span class="text-h6 font-weight-bold">{{ doc.type }}</span>
                            <v-chip class="ml-auto" color="blue" size="small" variant="elevated">
                                {{ doc.number }}
                            </v-chip>
                        </div>
                        <v-divider class="my-2" />
                        <v-card-text style="padding: 0;">
                            <div class="mb-2">
                                <v-icon size="18" color="primary" class="mr-1">mdi-calendar</v-icon>
                                <strong>Date:</strong> {{ doc.date }}
                            </div>
                            <div class="mb-2">
                                <v-icon size="18" color="primary" class="mr-1">mdi-text-box-outline</v-icon>
                                <strong>Description:</strong> {{ doc.description }}
                            </div>
                            <div class="mb-2" v-if="doc.invoiceType">
                                <v-icon size="18" color="primary" class="mr-1">mdi-file-certificate</v-icon>
                                <strong>Invoice type:</strong>
                                <v-chip color="green" size="small"
                                    v-if="doc.invoiceType === 'standard'">Standard</v-chip>
                                <v-chip color="orange" size="small" v-else>{{ doc.invoiceType }}</v-chip>
                            </div>
                            <div>
                                <v-icon size="18" color="primary" class="mr-1">mdi-account</v-icon>
                                <strong>Employee ID:</strong> {{ doc.employeeId }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-pagination v-model="page" :length="Math.ceil(total / 9)" :total-visible="7" color="primary" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '../stores/documentStore'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const router = useRouter()
const page = ref(Number(route.query.page) || 1)
const selectedEmployee = ref(route.query.employeeId ? Number(route.query.employeeId) : null)

const documentStore = useDocumentStore()
const employeeStore = useEmployeeStore()
const { documents, total, loading, error } = storeToRefs(documentStore)
const { employees } = storeToRefs(employeeStore)

function fetchWithQuery() {
    const employeeId = route.query.employeeId
    documentStore.fetchDocuments(page.value, 6, employeeId)
}

watch(selectedEmployee, (val) => {
    router.replace({ query: { ...route.query, employeeId: val || undefined, page: 1 } })
    page.value = 1
    fetchWithQuery()
})

watch(page, (newPage) => {
    router.replace({ query: { ...route.query, page: newPage } })
    fetchWithQuery()
})

watch(
    () => route.query.page,
    (newPage) => {
        if (Number(newPage) !== page.value) {
            page.value = Number(newPage) || 1
            fetchWithQuery()
        }
    }
)

watch(
    () => route.query.employeeId,
    (newId) => {
        selectedEmployee.value = newId ? Number(newId) : null
        fetchWithQuery()
    }
)

onMounted(() => {
    employeeStore.fetchEmployees(1, '', true)
    fetchWithQuery()
})
</script>

<style scoped></style>