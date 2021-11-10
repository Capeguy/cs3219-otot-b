import apiClient, { matchingURL } from '../apiClient'

// Join the matching pool.
export const joinMatchingPool = (data) => {
  return apiClient().post(`${matchingURL}/matching`, JSON.stringify(data))
}

// Get status of matching request.
export const getMatchingStatus = (id) => {
  return apiClient().get(`${matchingURL}/matching/${id}`)
}

// Cancel a matching request. Returns a match request if found.
export const cancelMatchingRequest = (id) => {
  return apiClient().delete(`${matchingURL}/matching/${id}`)
}
