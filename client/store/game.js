import axios from 'axios'
import {
  CREATED_PLAYER,
  STARTED_GAME,
  GUESSED_CORRECT,
  GUESSED_WRONG,
  COUNTDOWN_COMPLETED,
  SWITCHED_USER,
  FINISHED_GAME,
  WARNING,
  createdPlayer,
  startedGame,
  guessedCorrect,
  guessedWrong,
  countdownCompleted,
  switchedUser,
  finishedGame,
  warning
} from './action-creators'

/**
 * THUNK CREATORS
 */
export const createPlayer = userInfo => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/users', userInfo)
      const player = response.data
      dispatch(createdPlayer(player))
    } catch (error) {
      console.log('ERROR IN createPlayer THUNK --> ', error)
    }
  }
}

export const startGame = () => {
  return async dispatch => {
    //we want to check if there are at least two users
    const state = store.getState()
    if (state.playerList.length > 1) {
      dispatch(startedGame)
    } else {
      dispatch(warning)
    }
  }
}

export const guessCorrect = playerGuess => {
  return async dispatch => {
    //first check to see if player guess is equal to the current prompt
    const state = store.getState()
    if (playerGuess === state.currentPrompt) {
      dispatch(guessedCorrect)
    } else {
      dispatch(guessedWrong)
    }
  }
}

/**
 * INITIAL STATE
 */
const gameInitialState = {
  currentPrompt: '',
  roomCode: '',
  drawing: false,
  cleared: false,
  rounds: 0,
  winner: '',
  prompts: [],
  countdownComplete: false,
  warrning: 'Invite another user to start the game!'
}

const playerInitialState = {
  currentPlayer: '',
  playerList: []
}

/**
 * REDUCER
 */
export const gameReducer = function(state = gameInitialState, action) {
  switch (action.type) {
    case CREATED_PLAYER:
      // const {player} = action.player
      return {
        ...state,
        roomCode: action.player.gameCode,
        prompts: [...state.prompts, action.player.wordPrompts]
      }
    case STARTED_GAME:
      return {
        ...state,
        currentPrompt: state.prompts[0],
        rounds: state.rounds + 1
      }
    //in the case where there is not two users, warning will return default state and we will display warning message in the component
    case WARNING:
      return state
    default:
      return state
  }
}

export const playerReducer = function(state = playerInitialState, action) {
  switch (action.type) {
    case CREATED_PLAYER:
      // const {player} = action.player
      return {
        ...state,
        // playerList: [
        //   ...state.playerList,
        //   {username: action.player.users[0].username}
        // ],
        playerList: [
          ...state.playerList,
          {username: action.player.users[0].username, points: 30}
        ]
        // currentPlayer: 'whataaataa'
      }
    case STARTED_GAME:
      const firstPlayer = state.playerList[0]
      firstPlayer.rounds = 1
      return {
        ...state,
        currentPlayer: state.playerList[0],
        playerList: [firstPlayer, ...state.playerList.slice(1)]
      }
    case GUESSED_CORRECT:
      return {
        ...state,
        //we want to award 300 points to user that is not state.currentPlayer
        playerList: playerList.map(player => {
          if (player.userName !== state.currentPlayer) {
            player.points += 300
          }
          return player
        })
      }

    default:
      return state
  }
}

//CREATED_PLAYER DATA:
// {
//   "id": 1,
//   "rounds": 1,
//   "winner": null,
//   "gameCode": "game1",
//   "createdAt": "2020-07-12T23:50:46.170Z",
//   "updatedAt": "2020-07-12T23:50:46.170Z",
//   "users": [
//       {
//           "id": 3,
//           "username": "bob",
//           "createdAt": "2020-07-12T23:50:46.032Z",
//           "updatedAt": "2020-07-12T23:50:46.032Z",
//           "player": {
//               "points": 0,
//               "createdAt": "2020-07-12T23:50:46.245Z",
//               "updatedAt": "2020-07-12T23:50:46.245Z",
//               "userId": 3,
//               "gameId": 1
//           }
//       }
//   ],
//   "wordPrompts": [
//       {
//           "id": 46,
//           "name": "bucket",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 46
//           }
//       },
//       {
//           "id": 52,
//           "name": "cake",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 52
//           }
//       },
//       {
//           "id": 53,
//           "name": "calculator",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 53
//           }
//       },
//       {
//           "id": 54,
//           "name": "calendar",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 54
//           }
//       },
//       {
//           "id": 57,
//           "name": "camouflage",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 57
//           }
//       },
//       {
//           "id": 59,
//           "name": "candle",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 59
//           }
//       },
//       {
//           "id": 60,
//           "name": "cannon",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 60
//           }
//       },
//       {
//           "id": 64,
//           "name": "castle",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 64
//           }
//       },
//       {
//           "id": 65,
//           "name": "cat",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 65
//           }
//       },
//       {
//           "id": 66,
//           "name": "ceiling fan",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 66
//           }
//       },
//       {
//           "id": 72,
//           "name": "circle",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 72
//           }
//       },
//       {
//           "id": 77,
//           "name": "compass",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 77
//           }
//       },
//       {
//           "id": 78,
//           "name": "computer",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 78
//           }
//       },
//       {
//           "id": 79,
//           "name": "cookie",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 79
//           }
//       },
//       {
//           "id": 130,
//           "name": "giraffe",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 130
//           }
//       },
//       {
//           "id": 336,
//           "name": "waterslide",
//           "createdAt": "2020-07-12T23:50:34.182Z",
//           "updatedAt": "2020-07-12T23:50:34.182Z",
//           "gamePrompt": {
//               "createdAt": "2020-07-12T23:50:46.457Z",
//               "updatedAt": "2020-07-12T23:50:46.457Z",
//               "gameId": 1,
//               "wordPromptId": 336
//           }
//       }
//   ]
// }
