import React from 'react'
import {Start} from '../components'

export const Instructions = () => {
  return (
    <div>
      <h3>How to Play</h3>
      <div>
        {/* You get 16 turns, each turn you either have to draw the given prompt or
        guess what your opponent is drawing. You have three guesses each turn,
        you get a point if you correctly guess the prompt. The player with the
        most points at the end of the game wins. If this makes sense enter a
        username and create of join a game below. If this doesnt make sense I
        dont know what to tell you. */}
        There are three rounds for each game. Each player in the game room gets
        a chance to be the drawer. The drawer has to draw the prompt that they
        are given. All the other players in the game room has to guess what is
        being drawn. The faster the correct answer is guessed, the more points
        the player will get. When the timer is done, that ends the Drawer's
        turn, and the next person goes. Try to get as many points as possible to
        win the game!
      </div>
      <Start />
    </div>
  )
}

export default Instructions
