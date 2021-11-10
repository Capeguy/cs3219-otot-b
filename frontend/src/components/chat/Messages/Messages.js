import React from 'react'
import PropTypes from 'prop-types'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message/Message'

import './Messages.css'

const Messages = ({ messages, id }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} id={id} />
      </div>
    ))}
  </ScrollToBottom>
)

Messages.propTypes = {
  messages: PropTypes.array,
  id: PropTypes.string,
}

export default Messages
