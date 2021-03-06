import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {
  Home,
  Start,
  UserHome,
  Instructions,
  GameRoom,
  UserDashboard
} from './components'

// import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/start" component={Start} />
        <Route exact path="/" component={Home} />
        <Route exact path="/instructions" component={Instructions} />
        <Route path="/game" component={GameRoom} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in eventually we want whiteboard here */}
            <Route path="/game" component={GameRoom} />
          </Switch>
        )}
        {/* Displays our Home component as a fallback */}
        <Route component={Start} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    // loadInitialData() {
    //   dispatch(me())
    // }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  // loadInitialData: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired
}
