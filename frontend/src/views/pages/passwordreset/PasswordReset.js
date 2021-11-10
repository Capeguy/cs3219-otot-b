import React, { useState } from 'react'
import queryString from 'query-string'
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
import { useLocation } from 'react-router'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { resetPassword } from 'src/network/lib/auth'
const PasswordReset = () => {
  const location = useLocation()
  const { token } = queryString.parse(location.search)

  const password = useFormInput('')
  const passwordRepeat = useFormInput('')

  const [errMessage, setErrMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePasswordReset = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setSuccess(false)
    if (password.value !== passwordRepeat.value) {
      setErrMessage('Passwords do not match.')
    } else {
      console.log('handling password reset')
      resetPassword(token, { password: password.value })
        .then((res) => {
          console.log(res)
          setSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          setSuccess(false)
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
              Your password was successfully reset! :) Click{' '}
              <CAlertLink href="/#/login">here</CAlertLink> to login!
            </CAlert>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handlePasswordReset}>
                  <h1>Password Reset</h1>
                  <p className="text-medium-emphasis">Reset your password</p>

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
                      Reset Password
                    </CButton>
                  </div>
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

export default PasswordReset
