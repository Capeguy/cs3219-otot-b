// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  else return null
}

// set the user in the session storage
export const setUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

// return the token from the session storage
export const getToken = () => {
  return 1
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
}

// set the token and user in the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('user', JSON.stringify(user))
}
