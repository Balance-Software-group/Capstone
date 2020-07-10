import React from 'react'
import {Whiteboard} from '../components'

class GameRoom extends React.Component {
  constructor() {
    super()
    this.state = {
      guesser: '',
      drawer: '',
      prompt: '',
      guessNum: 0
    }
  }

  render() {
    return (
      <div>
        <div>prompt, chatbox, score and more will be here eventually</div>
        <Whiteboard />
      </div>
    )
  }
}

export default GameRoom
