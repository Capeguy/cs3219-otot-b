import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'
import {
  CAlert,
  CAlertLink,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLowVision, cilUser } from '@coreui/icons'
import { setUserSession } from 'src/utils/SessionStorage'
import { login } from 'src/network/lib/auth'

const Login = () => {
  const history = useHistory()
  const cookies = new Cookies()
  const [alert, setAlert] = useState()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const email = useFormInput('')
  const password = useFormInput('')

  const handleLogin = (event) => {
    event.preventDefault()
    event.stopPropagation()
    login({
      email: email.value,
      password: password.value,
    })
      .then((response) => {
        const res = response.data
        if (res.user.isEmailVerified) {
          setAlert()
          setUserSession(res.tokens.access.token, res.user)
          console.log('going to dashboard')
          cookies.set('RefreshToken', res.tokens.refresh.token, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(res.tokens.refresh.expires),
          })
          history.push('/dashboard')
        } else {
          setAlert({
            message:
              'Your email address is not verified. Verify your email address and try again. ',
            linkMessage: 'Resend your verification email here.',
            link: '/send-verify-email',
          })
        }
      })
      .catch((error) => {
        console.log(error)
        setAlert({ message: 'Invalid email/password.' })
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CAlert
              color="danger"
              dismissible
              visible={alert !== undefined}
              onClose={() => setAlert()}
            >
              {alert?.message}
              <CAlertLink href={`/#${alert?.link}`}>{alert?.linkMessage}</CAlertLink>
            </CAlert>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign in to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        {...email}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        {...password}
                        autoComplete="current-password"
                      />
                      <CInputGroupText
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        type="button"
                      >
                        <CIcon icon={cilLowVision} />
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p className="my-3">
                      Don&apos;t have an account? What are you waiting for?! Register for an account
                      and start PeerPrep-ing now! :)
                    </p>
                    <Link to="/register">
                      <CButton color="primary" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange,
  }
}

export default Login
