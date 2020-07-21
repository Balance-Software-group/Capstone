import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPlayer} from '../store'
import {Button, Form, Header} from 'semantic-ui-react'
import history from '../history'

const StartForm = props => {
  const {handleSubmit} = props
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Field>
            <label>
              <large>Enter Username</large>
            </label>
            <input
              name="username"
              type="text"
              onChange={e => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <large>Enter Room name</large>
            </label>
            <input
              name="gameCode"
              type="text"
              onChange={e => setRoom(e.target.value)}
            />
          </Form.Field>
          <div>
            <Button basic color="black" type="submit">
              Start Game
            </Button>
          </div>
        </div>
        <div />
      </Form>
    </div>
  )
}

const mapState = state => {
  return {
    players: state.playerReducer.playerList
  }
}

const mapDispatch = dispatch => {
  return {
    async handleSubmit(evt) {
      evt.preventDefault()
      const username = evt.target.username.value
      const gameCode = evt.target.gameCode.value
      await dispatch(createPlayer({username, gameCode}))
      history.push(`/game?name=${username}&room=${gameCode}`)
    }
  }
}

StartForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export const Start = connect(mapState, mapDispatch)(StartForm)
