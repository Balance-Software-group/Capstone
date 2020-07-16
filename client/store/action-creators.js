// ACTION CREATORS
export const CREATED_PLAYER = 'CREATED_PLAYER'
export const STARTED_GAME = 'STARTED_GAME'
export const GUESSED_CORRECT = 'GUESSED_CORRECT'
export const GUESSED_WRONG = 'GUESSED_WRONG'
export const COUNTDOWN_COMPLETED = 'COUNTDOWN_COMPLETED'
export const SWITCHED_USER = 'SWITCHED_USER'
export const FINISHED_GAME = 'FINISHED_GAME'
export const WARNING = 'WARNING'

// ACTION TYPES

export const createdPlayer = player => {
  return {
    type: CREATED_PLAYER,
    player
  }
}

export const startedGame = () => {
  return {
    type: STARTED_GAME
  }
}

export const guessedCorrect = () => {
  return {
    type: GUESSED_CORRECT
  }
}

export const guessedWrong = () => {
  return {
    type: GUESSED_WRONG
  }
}

const countdownCompleted = () => {
  return {
    type: COUNTDOWN_COMPLETED
  }
}

export const switchedUser = () => {
  return {
    type: SWITCHED_USER
  }
}

export const finishedGame = () => {
  return {
    type: FINISHED_GAME
  }
}

export const warning = () => {
  return {
    type: WARNING
  }
}
