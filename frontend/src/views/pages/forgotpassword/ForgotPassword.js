import React, { useState } from 'react'
import {
  CAlert,
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
import { forgotPassword, sendVerificationEmailNoAuth } from 'src/network/lib/auth'

const ForgotPassword = () => {
  const [status, setStatus] = useState(0)

  const email = useFormInput('')

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    forgotPassword({
      email: email.value,
    })
      .then((res) => {
        console.log(res)
        setStatus(res.status)
      })
      .catch((err) => {
        console.log(err)
        setStatus(err.status)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CAlert
              color="success"
              dismissible
              visible={status === 204}
              onClose={() => setStatus(0)}
              className="mx-4"
            >
              Password reset email has been sent successfully!
            </CAlert>
            <CAlert
              color="danger"
              dismissible
              visible={status >= 400 && status < 500}
              onClose={() => setStatus(0)}
              className="mx-4"
            >
              Invalid email address.
            </CAlert>
            <CAlert
              color="danger"
              dismissible
              visible={status === 500}
              onClose={() => setStatus(0)}
              className="mx-4"
            >
              Your email address is not verified. We have have sent you a verification email. Please
              verify before proceeding.
            </CAlert>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h2>Forgot Your Password?</h2>
                  <p className="text-medium-emphasis">
                    Fill in your email so we can send a password reset link to your email.
                  </p>

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

                  <div className="d-grid mb-3">
                    <CButton color="primary" type="submit">
                      Send Email
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

export default ForgotPassword
