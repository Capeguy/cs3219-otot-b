import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
)

Input.propTypes = {
  setMessage: PropTypes.func,
  sendMessage: PropTypes.func,
  message: PropTypes.string,
}

export default Input
