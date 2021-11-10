import React, { useState, useEffect } from 'react'
import { CCard, CCol, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane } from '@coreui/react'
import Editor from './../editor/Editor'
import Question from './Question'
import Solution from './Solution'
import PropTypes from 'prop-types'

const SessionCard = ({ session, question, showSolution = true }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const updateHeight = () => {
    setWindowHeight(window.innerHeight)
  }
  useEffect(() => {
    console.log(session)
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const [questionActiveKey, setQuestionActiveKey] = useState(1)

  return (
    <CCard className="overflow-hidden">
      <CRow>
        <CCol className="border py-2">
          <CNav variant="tabs" role="tablist" className="justify-content-end">
            <CNavItem>
              <CNavLink
                type="button"
                active={questionActiveKey === 1}
                onClick={() => setQuestionActiveKey(1)}
              >
                Question
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                type="button"
                active={questionActiveKey === 2}
                disabled={!showSolution}
                onClick={() => setQuestionActiveKey(2)}
              >
                Solution
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="question-tab"
              visible={questionActiveKey === 1}
              style={{ height: windowHeight - 260, overflowY: 'scroll' }}
            >
              <div className="p-5">
                <Question question={question} />
              </div>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="question-tab"
              visible={questionActiveKey === 2}
              style={{ height: windowHeight - 260, overflowY: 'scroll' }}
            >
              <div className="p-5">
                <Solution question={question} />
              </div>
            </CTabPane>
          </CTabContent>
        </CCol>
        <CCol className="border p-3" style={{ height: windowHeight - 200 }}>
          <Editor sessionId={session.id} />
        </CCol>
      </CRow>
    </CCard>
  )
}

SessionCard.propTypes = {
  session: PropTypes.object,
  question: PropTypes.object,
  showSolution: PropTypes.bool,
}

export default SessionCard
