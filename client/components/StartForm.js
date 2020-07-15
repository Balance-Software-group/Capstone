import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPlayer} from '../store'
import {Button, Form} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const StartForm = props => {
  console.log('PROOOPS', props)
  const {handleSubmit} = props
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    // <form onSubmit={createPlayer({username: event.target.username.value, gameCode: event.target.gameCode.value })}>
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>
            <small>Enter Username</small>
          </label>
          <input
            name="username"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label>
            <small>Enter Game name</small>
          </label>
          <input
            name="gameCode"
            type="text"
            onChange={e => setRoom(e.target.value)}
          />
        </div>
        <div>
          {/* <Link
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            to={`/game?name=${name}&room=${room}`}
            // to="/game"
          > */}
          <Button basic color="black" type="submit">
            Start Game
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </form>
  )
}

// const mapState = state => {
//   return {}
// }

const mapDispatch = dispatch => {
  console.log('MAP DISPATCH IS RUNNING!')
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('USERNAME!!!!!', evt)
      const username = evt.target.username.value
      const gameCode = evt.target.gameCode.value
      dispatch(createPlayer({username, gameCode}))
    }
    // createPlayer: (userInfo) => dispatch(createPlayer(userInfo))
  }
}

// StartForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
// }

export const Start = connect(null, mapDispatch)(StartForm)
