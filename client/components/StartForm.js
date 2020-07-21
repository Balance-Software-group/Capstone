import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPlayer} from '../store'
import {Button, Form, Header, Icon} from 'semantic-ui-react'
import history from '../history'

const StartForm = props => {
  const {handleSubmit} = props
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const h4Style = {
    textAlign: 'left'
  }
  const divStyle = {
    display: 'inline-block',
    width: '30rem'
  }

  return (
    <div style={divStyle}>
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Field>
            <label>
              <h4 style={h4Style}>Enter Username</h4>
            </label>
            <input
              name="username"
              type="text"
              onChange={e => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <h4 style={h4Style}>Enter Room name</h4>
            </label>
            <input
              name="gameCode"
              type="text"
              onChange={e => setRoom(e.target.value)}
            />
          </Form.Field>
          <div>
            <Button color="blue" animated type="submit">
              <Button.Content visible>Join Room</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
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
