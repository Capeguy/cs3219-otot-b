import React from 'react'
import PropTypes from 'prop-types'
import './Message.css'

import ReactEmoji from 'react-emoji'

const Message = ({ message: { text, user }, id }) => {
  let isSentByCurrentUser = user.id === id

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{user.name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user.name}</p>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
  id: PropTypes.string,
}

export default Message
