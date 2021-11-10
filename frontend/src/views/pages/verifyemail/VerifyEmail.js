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
import { sendVerificationEmailNoAuth } from 'src/network/lib/auth'

const VerifyEmail = () => {
  const email = useFormInput('')

  const [alert, setAlert] = useState(0)

  const handleVerifyEmail = (event) => {
    event.preventDefault()
    event.stopPropagation()

    console.log(email.value)

    sendVerificationEmailNoAuth({ email: email.value })
      .then((res) => {
        console.log(res)
        if (res.status === 204) {
          setAlert(1)
        } else {
          setAlert(2)
        }
      })
      .catch((err) => {
        console.log(err)
        setAlert(2)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CAlert
              className="mx-4"
              visible={alert == 1}
              color="success"
              dismissible
              onClose={() => setAlert(0)}
            >
              Email verification sent
            </CAlert>
            <CAlert
              className="mx-4"
              visible={alert == 2}
              color="danger"
              dismissible
              onClose={() => setAlert(0)}
            >
              Invalid email address.
            </CAlert>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleVerifyEmail}>
                  <h1>Email Verification</h1>
                  <p className="text-medium-emphasis">Verify your email.</p>

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

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Send Verification Email
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

export default VerifyEmail
