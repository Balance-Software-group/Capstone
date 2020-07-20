import React from 'react'
import {Link} from 'react-router-dom'
import {Start} from '../components'
import {Container, Header} from 'semantic-ui-react'
// import background from './background.png'

export const Home = () => {
  return (
    <Container>
      <div>
        <Header as="h2" block textAlign="center" color="grey">
          Chat and Draw in a private room with your friends
        </Header>
        <Start />
        <Header block textAlign="center">
          Enter a username and a room name to start. If you want to invite
          friends to your room, send them the room name and tell them to join!
        </Header>
      </div>
    </Container>
  )
}

export default Home
