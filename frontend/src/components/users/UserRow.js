import React, { useEffect, useState } from 'react'
import { CTableDataCell, CTableRow } from '@coreui/react'
import { getUser } from 'src/network/lib/users'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'

const UserRow = ({ user, index }) => {
  const history = useHistory()
  const [userObj, setUser] = useState()

  useEffect(() => {
    getUser(userObj.email)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return user ? (
    <CTableRow
      v-for="item in tableItems"
      onClick={() => history.push(`past-session/${userObj.id}`)}
    >
      <CTableDataCell>
        <div className="py-3">{index + 1}</div>
      </CTableDataCell>
      <CTableDataCell>
        <div className="py-3">{user.email}</div>
      </CTableDataCell>
    </CTableRow>
  ) : (
    <div />
  )
}

UserRow.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
}

export default UserRow
