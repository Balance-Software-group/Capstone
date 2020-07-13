import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'
import {Button, Form} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Form>
      <div>
        <Form.Field>
          <label>
            <small>Enter Username</small>
          </label>
          <input
            name="username"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            <small>Enter Game name</small>
          </label>
          <input
            name="gameName"
            type="text"
            onChange={e => setRoom(e.target.value)}
          />
        </Form.Field>
        <div>
          <Link
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <Button basic color="black" type="submit">
              Start Game
            </Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}

const mapStart = state => {
  return {
    name: 'Username',
    displayName: 'Username',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
    }
  }
}

export const Start = connect(mapStart, mapDispatch)(AuthForm)
