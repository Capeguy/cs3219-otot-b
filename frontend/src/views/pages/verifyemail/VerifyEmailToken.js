import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { CCol, CContainer } from '@coreui/react'

import { verifyEmail } from 'src/network/lib/auth'

const VerifyEmailToken = () => {
  const location = useLocation()
  const { token } = queryString.parse(location.search)

  const [loaded, setLoaded] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    verifyEmail(token)
      .then((res) => {
        if (res.status === 204) {
          setVerified(true)
        } else {
          setVerified(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setVerified(false)
      })
      .then((res) => {
        setLoaded(true)
      })
  }, [])

  return loaded ? (
    verified ? (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer fluid>
          <CCol>
            <h1>Your email is verified! :)</h1>
            <p>
              Click <Link to="/login">here</Link> to login now!
            </p>
          </CCol>
        </CContainer>
      </div>
    ) : (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer fluid>
          <CCol>
            <h1>Your email could not be verified.</h1>
            <p>
              Click <Link to="/send-verify-email">here</Link> to resend the email verification link!
            </p>
          </CCol>
        </CContainer>
      </div>
    )
  ) : (
    <div />
  )
}

export default VerifyEmailToken
