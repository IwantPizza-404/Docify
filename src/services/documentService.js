import axios from 'axios'

const API_URL = 'http://localhost:3000/documents'

export async function fetchDocuments(page = 1, limit = 6, employeeId) {
  const params = { _page: page, _per_page: limit }
  if (employeeId) params.employeeId = employeeId

  const response = await axios.get(API_URL, { params })
  return {
    data: response.data.data,
    total: response.data.items,
  }
}

export async function fetchDocument(id) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}