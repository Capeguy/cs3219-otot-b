import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getUserInterviews } from 'src/network/lib/interviews'
import { getUser } from 'src/utils/SessionStorage'
import UserRow from './UserRow'

const Users = () => {
  const [users, setUsers] = useState([])
  const [totalPage, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getUserInterviews({
      status: 'Ended',
      sortBy: { key: 'startDate', order: 'desc' },
      page: currentPage,
      limit: 5,
    })
      .then((res) => {
        //setPastSessions(res.data.results)
        setTotalPages(res.data.totalPages)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentPage])

  return (
    <CCard className="mb-4">
      <CCardHeader>View Past Sessions</CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border px-2" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>User Email</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((item, index) => (
              <UserRow session={item} index={index} key={index} />
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
  )
}

export default Users
