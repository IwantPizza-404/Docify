<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-skeleton-loader v-if="loading" type="card" />
                <v-alert v-else-if="error" type="error">{{ error }}</v-alert>
                <v-card v-else-if="document" class="pa-4" elevation="8">
                    <v-row align="center" no-gutters>
                        <v-col cols="auto">
                            <v-avatar size="64" class="mr-4">
                                <v-icon icon="mdi-file-document-outline" color="primary" size="64"></v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col>
                            <div class="d-flex align-center">
                                <span class="text-h5 font-weight-bold">
                                    {{ document.type }}
                                </span>
                                <v-chip class="ml-3" color="blue" dark>
                                    #{{ document.number }}
                                </v-chip>
                            </div>
                            <div class="grey--text text--darken-1 mt-1">
                                <v-icon color="primary" small class="mr-1">mdi-calendar</v-icon>
                                {{ document.date }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider class="my-4" />
                    <v-card-text>
                        <div class="d-flex align-center mb-2">
                            <v-icon color="primary" class="mr-2">mdi-text-box-outline</v-icon>
                            <strong>Description:</strong> {{ document.description }}
                        </div>
                        <div class="d-flex align-center mb-2" v-if="document.invoiceType">
                            <v-icon color="primary" class="mr-2">mdi-file-certificate</v-icon>
                            <strong>Invoice type:</strong>
                            <v-chip color="green" size="small"
                                v-if="document.invoiceType === 'standard'">Standard</v-chip>
                            <v-chip color="orange" size="small" v-else>{{ document.invoiceType }}</v-chip>
                        </div>
                        <div class="d-flex align-center mb-2">
                            <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                            <strong>Employee ID:</strong>
                            <span v-if="employeeName"> {{ employeeName }} </span>
                            <span v-else>{{ document.employeeId }}</span>
                        </div>
                    </v-card-text>
                </v-card>
                <v-alert v-else type="info">Document not found.</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDocumentStore } from '../stores/documentStore'
import { useEmployeeStore } from '../stores/employeeStore'

const route = useRoute()
const documentStore = useDocumentStore()
const employeeStore = useEmployeeStore()
const { document, loading, error } = storeToRefs(documentStore)
const { employees } = storeToRefs(employeeStore)

onMounted(() => {
    if (route.params.id) {
        documentStore.fetchDocument(route.params.id)
    }
    if (!employees.value || employees.value.length === 0) {
        employeeStore.fetchEmployees(1, '', true)
    }
})

const employeeName = computed(() => {
    if (!document.value || !employees.value) return ''
    const emp = employees.value.find(e => e.id === document.value.employeeId)
    return emp ? `${emp.firstName} ${emp.lastName}` : ''
})
</script>

<style scoped>
.v-card {
    border-radius: 18px;
}
</style>