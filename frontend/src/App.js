import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
import './scss/style.scss'
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
import UserTable from './components/users/UserTable'
import UserForm from './components/users/UserForm'
import Default from './view/default/Default'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
class App extends Component {
  render() {
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <Default />
      </div>
    )
  }
}

export default App
