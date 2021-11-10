import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import {
  cancelMatchingRequest,
  joinMatchingPool,
  getMatchingStatus,
} from 'src/network/lib/matching'
import { getOngoingUserInterviews } from 'src/network/lib/interviews'

const requestTimeoutSeconds = 30

const Matcher = () => {
  const history = useHistory()
  const location = useLocation()

  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Any']
  const interviewModes = ['Collaborative', 'Interviewer-Interviewee']
  const interviewRoles = ['Interviewee', 'Interviewer', 'No Preference']
  const matchingStatus = ['NONE', 'IN PROGRESS', 'SUCCESS', 'FAILED', 'SESSION IN PROGRESS']

  const difficultyLevel = useFormInput(difficultyLevels[0])
  const interviewMode = useFormInput(interviewModes[0])
  const interviewRole = useFormInput(interviewRoles[0])

  const [status, setStatus] = useState(matchingStatus[0])
  const [matchingRequest, setMatchingRequest] = useState()

  const openSession = () => {
    setStatus(matchingStatus[2])
    setMatchingRequest()
    console.log('Matched')
    if (location.pathname === '/session') {
      window.location.reload(false)
    } else {
      history.push('/session')
    }
  }

  const checkForMatch = (matchingRequest, seconds) => {
    getMatchingStatus(matchingRequest.id).then((res) => {
      console.log(res.data.status)

      switch (res.data.status) {
        case 'Matched':
          openSession(res.data)
          break
        case 'Matching':
          if (seconds < requestTimeoutSeconds) {
            setTimeout(() => checkForMatch(matchingRequest, seconds + 1), 1000)
          } else {
            setStatus(matchingStatus[3])
            setMatchingRequest()
          }
          break
        case 'Cancelled':
          if (seconds === requestTimeoutSeconds) {
            setStatus(matchingStatus[3])
            setMatchingRequest()
          }
          break
      }
    })
  }

  const handleStartMatching = () => {
    const data = {
      questionDifficulty: difficultyLevel.value,
      interviewType: interviewMode.value,
    }

    if (interviewMode.value === 'Interviewer-Interviewee') {
      data['interviewRole'] = interviewRole.value
    }

    joinMatchingPool(data)
      .then((res) => {
        console.log(res)
        if (res.data.status === 'Matched') {
          openSession(res.data)
        } else {
          setStatus(matchingStatus[1])
          setMatchingRequest(res.data)
          checkForMatch(res.data, 1)
        }
      })
      .catch((err) => {
        console.log(err)
        setStatus(matchingStatus[3])
      })
  }

  const handleCancelMatching = () => {
    cancelMatchingRequest(matchingRequest.id)
      .then((res) => {
        setStatus(matchingStatus[0])
        setMatchingRequest()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (status === matchingStatus[1]) {
      handleCancelMatching()
    } else {
      handleStartMatching()
    }
  }

  const button = () => {
    switch (status) {
      case matchingStatus[0]:
      case matchingStatus[2]:
      case matchingStatus[3]:
        return {
          color: 'primary',
          text: 'Start Session',
          disabled: false,
        }
      case matchingStatus[1]:
        return {
          color: 'danger',
          text: 'Cancel Matching',
          disabled: false,
        }
      case matchingStatus[4]:
        return {
          color: 'secondary',
          text: 'Session In Progress',
          disabled: true,
        }
    }
  }

  useEffect(() => {
    getOngoingUserInterviews().then((res) => {
      const current = res.data.results
      if (current.length > 0) {
        setStatus(matchingStatus[4])
        console.log(current)
      }
    })
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>Start New Session</CCardHeader>
      <CCardBody>
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <CRow className="my-3">
            <CCol xs={12} xl={5}>
              <CFormLabel className="col-form-label">Difficulty Level</CFormLabel>
            </CCol>
            <CCol xs={12} xl={7}>
              <CFormSelect id="difficulty-level" {...difficultyLevel}>
                {difficultyLevels.map((diff) => {
                  return (
                    <option value={diff} key={diff}>
                      {diff}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="my-3">
            <CCol xs={12} xl={5}>
              <CFormLabel className="col-form-label">Interview Mode</CFormLabel>
            </CCol>
            <CCol xs={12} xl={7}>
              <CFormSelect id="interview-mode" {...interviewMode}>
                {interviewModes.map((mode) => {
                  return (
                    <option value={mode} key={mode}>
                      {mode}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          </CRow>
          {interviewMode.value === 'Collaborative' ? null : (
            <CRow className="my-3">
              <CCol xs={12} xl={5}>
                <CFormLabel className="col-form-label">Role</CFormLabel>
              </CCol>
              <CCol xs={12} xl={7}>
                <CFormSelect id="interview-role" {...interviewRole}>
                  {interviewRoles.map((role) => {
                    return (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
            </CRow>
          )}
          <div className="d-grid">
            <CButton
              type="submit"
              color={button().color}
              className="px-4"
              disabled={button().disabled}
            >
              {button().text}
            </CButton>
          </div>
        </CForm>
        <CAlert
          className="mt-3"
          color="danger"
          dismissible
          visible={status === matchingStatus[3]}
          onClose={() => setStatus(matchingStatus[0])}
        >
          Failed to find a match. Please try again! :(
        </CAlert>
      </CCardBody>
    </CCard>
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

export default Matcher
