import axios from 'axios'
import Cookies from 'universal-cookie'
import { getToken, removeUserSession } from '../utils/SessionStorage'

export const baseURL = `http://localhost:3001/v1`

export const authURL = `/auth/v1`
export const matchingURL = `/matching/v1`
export const interviewsURL = `/interviews/v1`
export const questionsURL = `/questions/v1`
export const usersUrl = `http://localhost:3001/v1/`

const getApiClient = () => {
  const client = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return client
}

export default getApiClient
