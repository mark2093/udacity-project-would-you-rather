import {
  SAVE_A_QUESTION,
  REMOVE_A_QUESTION,
  SAVE_A_ANSWER,
  REMOVE_A_ANSWER,
  RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case SAVE_A_QUESTION :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          questions: [...state[action.user].questions, action.qid]
        }
      }
    case REMOVE_A_QUESTION :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          questions: state[action.user].questions.filter((question) => {
            return question !== action.qid
          })
        }
      }
    case SAVE_A_ANSWER :
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          answers : {
            ...state[action.user].answers,
            [action.qid] : action.answer
          }
        }
      }
    case REMOVE_A_ANSWER :
      const { [action.qid]: value, ...newAnswers} = state[action.user].answers
      return {
        ...state,
        [action.user] : {
          ...state[action.user],
          answers : newAnswers
        }
      }
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    default :
      return state
  }
}
