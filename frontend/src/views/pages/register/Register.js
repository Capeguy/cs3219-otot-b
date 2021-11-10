import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CAlert,
  CAlertLink,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { register, sendVerificationEmail } from 'src/network/lib/auth'
import { removeUserSession, setUserSession } from 'src/utils/SessionStorage'

const Register = () => {
  const [errMessage, setErrMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const name = useFormInput('')
  const email = useFormInput('')
  const password = useFormInput('')
  const passwordRepeat = useFormInput('')

  const handleRegister = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (password.value !== passwordRepeat.value) {
      setErrMessage('Passwords do not match.')
    } else {
      console.log('handling register')
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      })
        .then((response) => {
          console.log(response)
          setUserSession(response.data.tokens.access.token, response.data.user)
          setSuccess(true)
          sendVerificationEmail()
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
              setErrMessage('Verification email was not sent successfully.')
            })
          removeUserSession()
        })
        .catch((err) => {
          if (err.status === 400) {
            setErrMessage(err.data.message)
          }
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CAlert
              className="mx-4"
              visible={errMessage !== ''}
              color="danger"
              dismissible
              onClose={() => setErrMessage('')}
            >
              {errMessage}
            </CAlert>
            <CAlert
              className="mx-4"
              visible={success}
              color="success"
              dismissible
              onClose={() => setSuccess(false)}
            >
              Account is successfully registered. A verification email will be sent to you soon. If
              you do not receive the email, resend the verificaiton email{' '}
              <CAlertLink href="/#/send-verify-email">here</CAlertLink>.
            </CAlert>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Name" {...name} autoComplete="username" required />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      {...email}
                      autoComplete="email"
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      {...password}
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      {...passwordRepeat}
                      autoComplete="new-password"
                      required
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                  <p className="text-medium-emphasis text-center pt-3">
                    Already have an account? <Link to="login">Login here</Link>!
                  </p>
                </CForm>
              </CCardBody>
            </CCard>
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

export default Register
