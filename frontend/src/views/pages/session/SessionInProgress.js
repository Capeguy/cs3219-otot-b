import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCloseButton,
  CCol,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChatBubble } from '@coreui/icons'
import Chat from 'src/components/chat/Chat'
import SessionCard from 'src/components/session/SessionCard'
import { endInterview } from 'src/network/lib/interviews'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { getUser } from 'src/utils/SessionStorage'

const SessionInProgress = ({ session, question }) => {
  const history = useHistory()

  const [chatVisible, setChatVisible] = useState(false)

  const showSolution =
    session.interviewType === 'Collaborative' || session.firstUserId === getUser().id

  const handleLeaveSession = () => {
    endInterview(session.id)
      .then((res) => {
        console.log('Left Interview')
        history.push('/dashboard')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CCol>
        <SessionCard session={session} question={question} showSolution={showSolution} />
        <CRow className="mt-3">
          <CCol>
            <CButton onClick={handleLeaveSession}>Leave Session</CButton>
          </CCol>
          <CCol className="d-md-flex justify-content-md-end">
            <CButton onClick={() => setChatVisible(true)}>
              <CIcon icon={cilChatBubble} />
            </CButton>
          </CCol>
        </CRow>
      </CCol>
      <COffcanvas
        scroll
        backdrop={false}
        placement="end"
        visible={chatVisible}
        onHide={() => setChatVisible(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Chat</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setChatVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <Chat room={session.id} isOpen={chatVisible} />
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}

SessionInProgress.propTypes = {
  session: PropTypes.object,
  question: PropTypes.object,
  inProgress: PropTypes.bool,
}

export default SessionInProgress
