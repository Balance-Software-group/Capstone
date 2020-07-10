import React from 'react'
import {Link} from 'react-router-dom'
import {Start} from '../components'
import {Container, Header} from 'semantic-ui-react'

export const Home = () => {
  return (
    <Container text>
      <div>
        <Header as="h2" block textAlign="center">
          Welcome to Sketch and Guess everybody!
        </Header>
        <Start />
        <Link to="/instructions">Instructions</Link>
      </div>
    </Container>
  )
}

export default Home
