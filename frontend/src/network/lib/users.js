import apiClient, { authURL } from '../apiClient'

// Create a user (for admins only).
export const createUser = (data) => {
  data.role = 'user'
  return apiClient().post(`/users`, JSON.stringify(data))
}

// Get all users (for admins only).
export const getUsers = ({ page, limit }) => {
  return apiClient().get(`/users?&page=${page}&limit=${limit}`)
}

// Get a user. Logged in users can only fetch their own user information.
// Only admins can fetch other users.
export const getUser = (id) => {
  return apiClient().get(`/users/${id}`)
}

// Update a user. Logged in users can only update their own information.
// Only admins can update other users.
export const updateUser = (id, data) => {
  return apiClient().patch(`/users/${id}`, JSON.stringify(data))
}

// Delete a user. Logged in users can delete only themselves.
// Only admins can delete other users.
export const deleteUser = (id) => {
  return apiClient().delete(`/users/${id}`)
}
