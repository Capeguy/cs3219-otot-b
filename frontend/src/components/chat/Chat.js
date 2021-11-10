import React, { useState, useEffect, useRef } from 'react'
import { CContainer, CToast, CToastBody, CToastClose, CToaster } from '@coreui/react'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

import Messages from './Messages/Messages'
import Input from './Input/Input'
import { getUser } from 'src/utils/SessionStorage'
import './Chat.css'

const ENDPOINT = 'http://localhost:5005/'
// const ENDPOINT = 'http://chat:4000/'

let socket

const Chat = ({ room, isOpen }) => {
  const name = getUser().name
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const [socketId, setSocketId] = useState()
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  useEffect(() => {
    if (socket === undefined) socket = io(ENDPOINT)
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error)
      }
      setSocketId(socket.id)
    })
  }, [ENDPOINT])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
      if (message.user.id !== socket.id) {
        sendToast(message.text)
      }
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  const sendToast = (message) => {
    addToast(
      <CToast
        autohide={true}
        delay={3000}
        color="primary"
        className="text-white align-items-center"
      >
        <div className="d-flex">
          <CToastBody>{message}</CToastBody>
          <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>,
    )
  }

  return (
    <CContainer style={{ width: '100%', height: '100%' }}>
      <Messages messages={messages} id={socketId} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      <CToaster
        ref={toaster}
        push={toast}
        placement="top-end"
        className={isOpen ? 'visually-hidden' : ''}
      />
    </CContainer>
  )
}

Chat.propTypes = {
  room: PropTypes.string,
  isOpen: PropTypes.bool,
}

export default Chat
