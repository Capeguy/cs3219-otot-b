import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { getUser, setUser } from 'src/utils/SessionStorage'
import { updateUser } from 'src/network/lib/users'
import { forgotPassword, sendVerificationEmail } from 'src/network/lib/auth'

const Settings = () => {
  const [emailStatus, setEmailStatus] = useState(0)
  const [savedChanges, setSavedChanges] = useState(false)

  const user = getUser()

  const name = useFormInput(user.name)
  const email = useFormInput(user.email)

  const handleChange = (event) => {
    event.preventDefault()
    event.stopPropagation()

    updateUser(user.id, {
      name: name.value,
    })
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          setUser(res.data)
          setSavedChanges(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePasswordReset = (event) => {
    console.log('handling password reset')
    forgotPassword({
      email: email.value,
    })
      .then((res) => {
        console.log(res)
        setEmailStatus(res.status)
      })
      .catch((err) => {
        let res = err.response
        console.log(res)
        setEmailStatus(res.status)
        if (res.status === 500) {
          // TODO: Update this to send verification email with email address.
          sendVerificationEmail()
        }
      })
  }

  return (
    <div className="bg-light align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h2>Account Settings</h2>
                  <p className="text-medium-emphasis">Update your account details.</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Name" {...name} autoComplete="display" required />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      {...email}
                      autoComplete="email"
                      disabled
                    />
                  </CInputGroup>

                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <CButton className="mx-2" color="success" onClick={handleChange}>
                      Save Changes
                    </CButton>
                    <CButton className="mx-2" color="secondary" onClick={handlePasswordReset}>
                      Reset Password
                    </CButton>
                  </div>
                  <CAlert
                    color="success"
                    className="mt-3"
                    dismissible
                    visible={savedChanges}
                    onClose={() => setSavedChanges(false)}
                  >
                    Your account details have been saved successfully! :)
                  </CAlert>
                  <CAlert
                    color="success"
                    className="mt-3"
                    dismissible
                    visible={emailStatus === 204}
                    onClose={() => setEmailStatus(0)}
                  >
                    Password reset email has been sent successfully!
                  </CAlert>
                  <CAlert
                    color="danger"
                    className="mt-3"
                    dismissible
                    visible={emailStatus === 500}
                    onClose={() => setEmailStatus(0)}
                  >
                    Your email address is not verified. We have have sent you a verification email.
                    Please verify before proceeding.
                  </CAlert>
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

export default Settings
