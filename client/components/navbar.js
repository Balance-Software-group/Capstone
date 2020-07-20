import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Header, Image} from 'semantic-ui-react'
// import title from '../../public/title.jpg'

const title = '../../public/title.jpg'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Header textAlign="center">
    <h1>Chat and Draw</h1>
    <Image src={title} />
    <nav />
    <hr />
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
