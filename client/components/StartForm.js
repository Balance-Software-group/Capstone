import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Form} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const StartForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <Form>
      <div>
        {/* <form onSubmit={handleSubmit} name={name}> */}
        <Form.Field>
          <label>
            <small>Enter Username</small>
          </label>
          <input name="username" type="text" />
        </Form.Field>
        <Form.Field>
          <label>
            <small>Enter Game name</small>
          </label>
          <input name="gameName" type="text" />
        </Form.Field>
        <div>
          <Button basic color="black" type="submit">
            Start Game
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        {/* </form> */}
      </div>
    </Form>
  )
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export const Start = connect(mapState, mapDispatch)(StartForm)
