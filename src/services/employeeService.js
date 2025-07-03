import axios from 'axios'

const API_URL = 'http://localhost:3000/employees'

export async function fetchEmployees(page = 1, limit = 12, search = '') {
  const response = await axios.get(API_URL, {
    params: {
      _page: page,
      _per_page: limit,
      q: search,
    },
  })
  return {
    data: response.data.data,
    total: Number(response.data.items) || 0,
  }
}

export async function fetchEmployee(id) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
