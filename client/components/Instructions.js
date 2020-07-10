import React from 'react'
import {Start} from '../components'

export const Instructions = () => {
  return (
    <div>
      <h3>How to Play</h3>
      <div>
        You get 16 turns, each turn you either have to draw the given prompt or
        guess what your opponent is drawing. You have three guesses each turn,
        you get a point if you correctly guess the prompt. The player with the
        most points at the end of the game wins. If this makes sense enter a
        username and create of join a game below. If this doesnt make sense I
        dont know what to tell you.
      </div>
      <Start />
    </div>
  )
}

export default Instructions
