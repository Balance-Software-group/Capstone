import React from 'react'

const Message = ({message: {user, text}, name}) => {
  const senderBox = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 5%',
    marginTop: '3px'
  }
  const sentText = {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: '#828282',
    letterSpacing: '0.3px',
    paddingRight: '10px'
  }

  const senderMessageBox = {
    background: '#2979FF',
    borderRadius: '20px',
    padding: '5px 20px',
    color: 'black',
    display: 'inline-block',
    maxWidth: '80%'
  }

  const senderMessageText = {
    width: '100%',
    letterSpacing: '0',
    float: 'left',
    fontSize: '1.1em',
    wordWrap: 'break-word',
    color: 'white'
  }

  const receiverBox = {
    display: 'flex',
    padding: '0 5%',
    marginTop: '3px',
    justifyContent: 'flex-start'
  }

  const receiverMessageBox = {
    background: '#F3F3F3',
    borderRadius: '20px',
    padding: '5px 20px',
    color: 'white',
    display: 'inline-block',
    maxWidth: '80%'
  }

  const receiverMessageText = {
    color: '#353535'
  }

  let sender = false
  if (user === name) {
    sender = true
  }
  return sender ? (
    <div style={senderBox}>
      <p style={sentText}>{name}</p>
      <div style={senderMessageBox}>
        <p style={senderMessageText}>{text}</p>
      </div>
    </div>
  ) : (
    <div style={receiverBox}>
      <div style={receiverMessageBox}>
        <p style={receiverMessageText}>{text}</p>
      </div>
      <p style={sentText}>{user}</p>
    </div>
  )
}

export default Message
