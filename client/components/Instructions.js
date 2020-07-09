import React from 'react'
import {Link} from 'react-router-dom'

export const Instructions = () => {
  return (
    <div>
      <h3>How to Play</h3>
      <div>
        You get 16 turns, each tun you either have to draw the given prompt or
        guess what your opponent is drawing. You have three guesses each turn,
        you get a point if you correctly guess the prompt. The player with the
        most points at the end of the game wins.
      </div>
      <Link to="/create-game">Create Game</Link>
      <Link to="/join-game">Join Game</Link>
    </div>
  )
}

export default Instructions
