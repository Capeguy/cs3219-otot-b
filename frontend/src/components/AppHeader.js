import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {
  CButton,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import logo from 'src/assets/brand/logo.png'
import { removeUserSession } from 'src/utils/SessionStorage'

const AppHeader = () => {
  const history = useHistory()

  const [logoutAlert, setLogoutAlert] = useState(false)

  const handleLogout = () => {
    removeUserSession()
    history.push('/login')
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CModal alignment="center" visible={logoutAlert} onClose={() => setLogoutAlert(false)}>
        <CModalHeader>
          <CModalTitle>Logout</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to log out?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLogoutAlert(false)}>
            No
          </CButton>
          <CButton color="primary" onClick={handleLogout}>
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
    </CHeader>
  )
}

export default AppHeader
