import React, { useState, useEffect } from 'react'
import { getOngoingUserInterviews } from 'src/network/lib/interviews'
import { getQuestion } from 'src/network/lib/questions'
const User = () => {
  const [session, setSession] = useState()
  const [question, setQuestion] = useState()
  const [loaded, setLoaded] = useState()

  useEffect(() => {
    getOngoingUserInterviews().then((res) => {
      const ongoing = res.data.results
      if (ongoing.length > 0) {
        const current = ongoing[0]
        getQuestion(current.questionId)
          .then((res) => {
            setQuestion(res.data)
            setSession(current)
            setLoaded(true)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        setLoaded(true)
      }
    })
  }, [])

return <div />
}

export default User
