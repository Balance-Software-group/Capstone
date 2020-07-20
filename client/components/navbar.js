import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Header, Image} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div text-align="center">
    <img src="https://i.imgur.com/tUkRVPV.png?1" height="100px" />
    <nav />
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    // handleClick() {
    //   dispatch(logout())
    // }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  // handleClick: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired
}
