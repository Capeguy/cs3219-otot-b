import React, { useState, useEffect } from 'react'
import { createUser, getUsers, updateUser, deleteUser } from 'src/network/lib/users'
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
  CPaginationItem,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CPagination,
  CTable,
  CTableBody,
  CCardHeader,
  CTableHead,
} from '@coreui/react'

const Default = () => {
  const [users, setUsers] = useState([])
  const [totalPage, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [alert, setAlert] = useState()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    updateUsers()
  }, [currentPage])

  const updateUsers = () => {
    getUsers({
      page: currentPage,
      limit: 10,
    })
      .then((res) => {
        console.log(res.data.results)
        setUsers(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = (event) => {
    console.log('User ID: ' + id)
    event.preventDefault()
    event.stopPropagation()
    if (id) {
      updateUser(id, {
        name: name,
        email: email,
        password: password,
      })
        .then((response) => {
          const res = response.data
          setAlert({ message: `User \'${response.data.name}\' Updated!`, color: 'success' })
          event.target.reset()
          handleClear()
          updateUsers()
        })
        .catch((error) => {
          console.log(error)
          setAlert({ message: 'Invalid input, please check', color: 'danger' })
        })
    } else {
      createUser({
        name: name,
        email: email,
        password: password,
      })
        .then((response) => {
          const res = response.data
          setAlert({ message: `User \'${response.data.name}\' Created!`, color: 'success' })
          event.target.reset()
          handleClear()
          updateUsers()
        })
        .catch((error) => {
          console.log(error)
          setAlert({ message: 'Invalid input, please check', color: 'danger' })
        })
    }
  }

  const handleClear = () => {
    setId('')
    setName('')
    setEmail('')
    setPassword('')
  }

  const setCurrentUser = (user) => {
    setId(user.id)
    setName(user.name)
    setEmail(user.email)
    setPassword(user.password)
  }

  const handleDeleteUser = (id) => {
    deleteUser(id).then((res) => {
      setAlert({ message: `User Deleted!`, color: 'success' })
      updateUsers()
    })
  }

  return (
    <CContainer fluid>
      <CRow className="flex-row-reverse">
        <CCol sm={12} md={4}>
          <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer fluid>
              <CRow className="justify-content-center">
                <CCol md={8}>
                  <CAlert
                    color={alert?.color}
                    dismissible
                    visible={alert !== undefined}
                    onClose={() => setAlert()}
                  >
                    {alert?.message}
                  </CAlert>
                  <CCardGroup>
                    <CCard className="p-4">
                      <CCardBody>
                        <CForm onSubmit={handleSubmit} id="userForm">
                          <CFormInput
                            onChange={(e) => setId(e.target.value)}
                            type="hidden"
                            placeholder="ID"
                            value={id}
                          />
                          <CInputGroup className="mb-3">
                            <CFormInput
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              placeholder="Name"
                              value={name}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              placeholder="Email"
                              value={email}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              placeholder="Password"
                              value={password}
                            />
                          </CInputGroup>
                          <CRow>
                            <CCol xs={6}>
                              <CButton type="submit" color="primary" className="px-4">
                                Submit
                              </CButton>
                            </CCol>
                            <CCol xs={6}>
                              <CButton
                                type="reset"
                                onClick={handleClear}
                                color="danger"
                                className="px-4"
                              >
                                Clear
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </CCol>
        <CCol sm={12} md={8}>
          <CCard className="mb-4">
            <CCardHeader>View Users</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border px-2" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.map((item, index) => (
                    <CTableRow
                      key={index}
                      // onClick={() => history.push(`past-session/${userObj.id}`)}
                    >
                      <CTableDataCell>
                        <div className="py-1">{(currentPage - 1) * 10 + index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="py-1">{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="py-1">{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={() => setCurrentUser(item)}
                          color="primary"
                          className="px-4"
                        >
                          Edit
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={() => handleDeleteUser(item.id)}
                          color="danger"
                          className="px-4"
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <br />
              <CPagination align="center">
                <CPaginationItem
                  aria-label="First"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem
                  className={currentPage <= 2 ? 'visually-hidden' : ''}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {currentPage - 2}
                </CPaginationItem>
                <CPaginationItem
                  className={currentPage === 1 ? 'visually-hidden' : ''}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {currentPage - 1}
                </CPaginationItem>
                <CPaginationItem active>{currentPage}</CPaginationItem>
                <CPaginationItem
                  className={currentPage >= totalPage ? 'visually-hidden' : ''}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </CPaginationItem>
                <CPaginationItem
                  className={currentPage >= totalPage - 1 ? 'visually-hidden' : ''}
                  onClick={() => setCurrentPage(currentPage + 2)}
                >
                  {currentPage + 2}
                </CPaginationItem>
                <CPaginationItem
                  aria-label="Last"
                  disabled={currentPage >= totalPage}
                  onClick={() => setCurrentPage(totalPage)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
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

export default Default
