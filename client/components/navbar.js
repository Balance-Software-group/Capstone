import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Header, Image} from 'semantic-ui-react'

const myStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  marginBottom: '-2.5rem'
}

const Navbar = ({handleClick, isLoggedIn}) => (
  <Header textAlign="center">
    <div>
      <Link to="/">
        <img
          src="https://i.imgur.com/rSNU9Rp.png?1"
          width="100%"
          style={myStyle}
        />
      </Link>
      {/* <nav />
    <hr /> */}
    </div>
  </Header>
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
