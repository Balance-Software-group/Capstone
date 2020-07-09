import React from 'react'
import {Link} from 'react-router-dom'
import {Start} from '../components'

export const Home = () => {
  return (
    <div>
      <h3>Welcome Home</h3>
      <Start />
      <Link to="/instructions">Instructions</Link>
    </div>
  )
}

export default Home
