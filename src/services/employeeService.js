import axios from 'axios'

const API_URL = 'http://localhost:3000/employees'

export async function fetchEmployees(page = 1, search = '', all = false) {
  let params = {}
  if (!all) {
    params = {
      _page: page,
      _per_page: 12,
      firstName: search,
    }
  }
  const response = await axios.get(API_URL, { params })
  if (!all){
    return {
        data: response.data.data,
        total: Number(response.data.items) || 0,
    }
  } else {
    return {
        data: response.data
    }
  }
}

export async function fetchEmployee(id) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}