import axios from 'axios'
import Cookies from 'universal-cookie'
import { getToken, removeUserSession } from '../utils/SessionStorage'

export const baseURL = `${process.env.REACT_APP_BASE_API_URL}/api`

export const authURL = `/auth/v1`
export const matchingURL = `/matching/v1`
export const interviewsURL = `/interviews/v1`
export const questionsURL = `/questions/v1`
export const usersUrl = `http://localhost:3001/v1/`

const getApiClient = () => {
  const cookies = new Cookies()

  const client = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })

  client.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      let res = error.response
      const originalRequest = error.config
      if (getToken() && res.status === 401) {
        // const refreshToken = cookies.get('RefreshToken')
        // if (refreshToken) {
        //   console.log(refreshToken)
        //   axios
        //     .post(`${baseURL}${authURL}/auth/refresh-tokens`, {
        //       refreshToken: refreshToken,
        //     })
        //     .then((res) => {
        //       if (res.status === 201) {
        //         // Put tokens to session storage / cookie
        //         setUserSession(res.tokens.access.token, res.user)
        //         cookies.set('RefreshToken', res.tokens.refresh.token, {
        //           sameSite: 'strict',
        //           path: '/',
        //           expires: new Date(res.tokens.refresh.expires),
        //         })

        //         // Change authorization header
        //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.tokens.access.token

        //         // Rturn originalRequest object wiht axios
        //         return axios(originalRequest)
        //       }
        //     })
        //     .catch((err) => {
        //       console.log(err.response)
        //     })
        // } else {
        removeUserSession()
        window.location.hash = '/'
        // }
      }
      console.error('Looks like there was a problem. Status Code: ' + res.status)
      throw error.response
    },
  )

  return client
}

export default getApiClient
