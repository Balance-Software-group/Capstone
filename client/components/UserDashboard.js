import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserDashboard extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        {/* {
                    // this.props.players.map(player => {
                        return (
                            <div> 
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
    players: state.playerList
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(UserDashboard)
