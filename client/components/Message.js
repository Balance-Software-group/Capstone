import React from 'react'

const Message = ({message: {user, text}, name}) => {
  return (
    <div>
      <p>{user}</p>
      <p>{text}</p>
    </div>
  )
}

export default Message
