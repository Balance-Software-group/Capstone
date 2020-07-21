import React from 'react'
import {Link} from 'react-router-dom'
import {Start} from '../components'
import {Container, Header} from 'semantic-ui-react'
// import background from './background.png'

export const Home = () => {
  const addedStyle = {
    height: '60rem',
    backgroundImage: 'url(https://i.imgur.com/wYfSa1d.png?2)',
    textAlign: 'center'
  }

  const header1Style = {
    background: '#F3F3F3',
    width: '30rem',
    display: 'inline-block',
    marginTop: '8rem',
    borderRadius: '20px'
  }

  const header2Style = {
    background: '#F3F3F3',
    width: '30rem',
    display: 'inline-block',
    marginTop: '1rem',
    borderRadius: '20px'
  }

  const secondDiv = {
    textAlign: 'center'
  }

  return (
    <div style={addedStyle}>
      <div>
        {/* <Header as="h2" block textAlign="center" color="grey">
            Chat and Draw in a private room with your friends
          </Header> */}
        <div style={header1Style}>
          <h2>Chat and Draw in a private room with your friends</h2>
        </div>

        <div style={secondDiv}>
          <Start />
        </div>

        <div style={header2Style}>
          Enter a username and a room name to start. If you want to invite
          friends to your room, send them the room name and tell them to join!
        </div>
      </div>
    </div>
  )
}

export default Home
