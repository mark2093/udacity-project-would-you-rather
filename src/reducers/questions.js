import {
  SAVE_A_QUESTION,
  REMOVE_A_QUESTION,
  SAVE_VOTE_OF_A_QUESTION,
  REMOVE_VOTE_OF_A_QUESTION,
  UPDATE_A_QUESTIONS } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case SAVE_A_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case REMOVE_A_QUESTION : {
      const { [action.question.id]: value, ...newState} = state
      return newState
    }
    case SAVE_VOTE_OF_A_QUESTION : {
      const votes = state[action.qid][action.answer].votes
      return {
        ...state,
        [action.qid] : {
          ...state[action.qid],
          [action.answer] : {
            ...state[action.qid][action.answer],
            votes : votes.concat([action.authedUser])
          }
        }
      }
    }
    case REMOVE_VOTE_OF_A_QUESTION :
      return {
        ...state,
        [action.qid] : {
          ...state[action.qid],
          [action.answer] : {
            ...state[action.qid][action.answer],
            votes : state[action.qid][action.answer]
              .votes.filter((vote) => vote !== action.authedUser)
          }
        }
      }
    case UPDATE_A_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    default :
      return state
  }
}
