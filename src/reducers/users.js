import {
    SAVE_A_ANSWER,
    REMOVE_A_ANSWER,
    SAVE_A_QUESTION,
    REMOVE_A_QUESTION,
    usersUpdate
     } from '../actions/users'
  
  export default function users (state = {}, action) {
    switch(action.type) {
        case SAVE_A_ANSWER :
        return {
          ...state,
          [action.authedUser] : {
            ...state[action.authedUser],
            answers : {
              ...state[action.authedUser].answers,
              [action.ques_id] : action.answer
            }
          }
        }

        case REMOVE_A_ANSWER :
        const { [action.ques_id]: value, ...newAnswers} = state[action.authedUser].answers
        return {
          ...state,
          [action.authedUser] : {
            ...state[action.authedUser],
            answers : newAnswers
          }
        }


      case SAVE_A_QUESTION :
        return {
          ...state,
          [action.user] : {
            ...state[action.authedUser],
            questions: [...state[action.authedUser].questions, action.ques_id]
          }
        }
      case REMOVE_A_QUESTION :
        return {
          ...state,
          [action.user] : {
            ...state[action.authedUser],
            questions: state[action.authedUser].questions.filter((question) => {
              return question !== action.ques_id
            })
          }
        }
      
      
      case usersUpdate :
        return {
          ...state,
          ...action.authedUsers
        }
      default :
        return state
    }
  }