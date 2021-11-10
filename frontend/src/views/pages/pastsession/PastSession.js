import React, { useState, useEffect } from 'react'
import SessionCard from 'src/components/session/SessionCard'
import { getUserInterview } from 'src/network/lib/interviews'
import { getQuestion } from 'src/network/lib/questions'
import { useLocation } from 'react-router'

const PastSession = () => {
  const location = useLocation()
  const sessionId = location.pathname.split('/')[2]

  const [session, setSession] = useState()
  const [question, setQuestion] = useState()
  const [loaded, setLoaded] = useState()

  useEffect(() => {
    console.log(sessionId)
    getUserInterview(sessionId).then((res) => {
      getQuestion(res.data.questionId)
        .then((res2) => {
          setQuestion(res2.data)
          setSession(res.data)
          setLoaded(true)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])

  return loaded ? <SessionCard session={session} question={question} /> : <div />
}

export default PastSession
