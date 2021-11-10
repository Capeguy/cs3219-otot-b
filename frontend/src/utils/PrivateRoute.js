import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from './SessionStorage'
import PropTypes from 'prop-types'

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
      }
    />
  )
}

export default PrivateRoute
