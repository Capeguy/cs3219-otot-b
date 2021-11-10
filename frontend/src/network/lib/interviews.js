import apiClient, { interviewsURL } from '../apiClient'

// Get interviews accessible to current user of given status.
export const getUserInterviews = ({ status, sortBy, page, limit }) => {
  return apiClient().get(
    `${interviewsURL}/interviews?status=${status}&sortBy=${sortBy.key}:${sortBy.order}&page=${page}&limit=${limit}`,
  )
}

// Get interviews accessible to current user that are ongoing.
export const getOngoingUserInterviews = () => {
  return apiClient().get(`${interviewsURL}/interviews/ongoing`)
}

// Get an interview.
export const getUserInterview = (id) => {
  return apiClient().get(`${interviewsURL}/interviews/${id}`)
}

// End an interview.
export const endInterview = (id) => {
  return apiClient().post(`${interviewsURL}/interviews/${id}`)
}
