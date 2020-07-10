import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label>
            <small>Enter Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label>
            <small>Enter Game name</small>
          </label>
          <input name="gameName" type="text" />
        </div>
        <div>
          <button type="submit">Start</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
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
