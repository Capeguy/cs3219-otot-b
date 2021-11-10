import React from 'react'

import { CCol, CRow } from '@coreui/react'

import Matcher from 'src/components/matching/Matcher'
import Users from 'src/components/users/Users'

const Dashboard = () => {
  return (
    <CRow className="flex-row-reverse">
      <CCol sm={12} md={4}>
        <Matcher />
      </CCol>
      <CCol sm={12} md={8}>
        <Users />
      </CCol>
    </CRow>
  )
}

export default Dashboard
