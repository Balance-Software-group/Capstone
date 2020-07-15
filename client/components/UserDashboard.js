import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserDashboard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        {console.log(this.props.players)}
        {/* {
                    this.props.players.map(player => {
                        return (
                            <div key={player.username}>
                                <h2>{player.username}</h2>
                                <h3>{player.points}</h3>
                            </div>
                        )
                    })
                } */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    players: state.playerReducer
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(UserDashboard)
