import { defineStore } from 'pinia'
import { fetchEmployees, fetchEmployee } from '../services/employeeService'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    employee: null,
    total: 0,
    loading: false,
    error: null,
  }),

  getters: {
    getEmployeeFullName: (state) => {
      if (!state.employee) return ''
      return `${state.employee.firstName} ${state.employee.lastName}`
    },
    getEmployeeInitials: (state) => {
      if (!state.employee) return '??'
      const firstName = state.employee.firstName || ''
      const lastName = state.employee.lastName || ''
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    },
    isEmployeeActive: (state) => {
      return state.employee?.active || false
    }
  },

  actions: {
    async fetchEmployees(page = 1, search = '') {
      try {
        this.loading = true
        this.error = null
        const result = await fetchEmployees(page, search)
        this.employees = result.data
        this.total = result.total
      } catch (error) {
        this.error = error.message || 'Failed to fetch employees'
        console.error('Error fetching employees:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchEmployee(id) {
      try {
        this.loading = true
        this.error = null
        this.employee = await fetchEmployee(id)
      } catch (error) {
        this.error = error.message || 'Failed to fetch employee'
        console.error('Error fetching employee:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    clearEmployee() {
      this.employee = null
      this.error = null
    },

    clearEmployees() {
      this.employees = []
      this.total = 0
      this.error = null
    }
  },
})