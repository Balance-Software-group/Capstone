// import axios from 'axios'

// //ACTION TYPES

// const GET_MESSAGE ='GET_MESSAGE'

// //INITIAL STATE

// const defaultChat = {
//     msg : '',
//     user: ''
// }

// //ACTION CREATORS

// const getMessage = message => ({type:GET_MESSAGE, message})

// //THUNK CREATORS

// export const fetchMessage = (roomId) => {
//     async (dispatch) => {
//         try {
//             const {data} = await axios.get('/')
//             //INSERT PROPER ROUTE HERE
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// //REDUCER

// export default function(state = defaultChat, action){
//     switch (action.type) {
//         case GET_MESSAGE:
//             return action.message
//         default:
//             return state
//     }
// }
