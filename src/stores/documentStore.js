import { defineStore } from 'pinia'
import { fetchDocuments, fetchDocument } from '../services/documentService'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documents: [],
    document: null,
    total: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDocuments(page = 1, limit = 6, employeeId) {
      try {
        this.loading = true
        this.error = null
        const result = await fetchDocuments(page, limit, employeeId)
        this.documents = result.data
        this.total = result.total
      } catch (error) {
        this.error = error.message || 'Failed to fetch documents'
      } finally {
        this.loading = false
      }
    },

    async fetchDocument(id) {
      try {
        this.loading = true
        this.error = null
        this.document = await fetchDocument(id)
      } catch (error) {
        this.error = error.message || 'Failed to fetch document'
      } finally {
        this.loading = false
      }
    },

    clearDocument() {
      this.document = null
      this.error = null
    },

    clearDocuments() {
      this.documents = []
      this.total = 0
      this.error = null
    },
  },
})