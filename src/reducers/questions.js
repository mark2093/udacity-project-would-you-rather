import {
    SAVE_A_QUESTION,REMOVE_A_QUESTION,SAVE_VOTE_OF_A_QUESTION,
    REMOVE_VOTE_OF_A_QUESTION,UPDATE_A_QUESTIONS } from '../actions/questions'

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
            const votes = state[action.questid][action.answer].votes
            return {
              ...state,
              [action.questid] : {
                ...state[action.questid],
                [action.answer] : {
                  ...state[action.questid][action.answer],
                  votes : votes.concat([action.authUser])
                }
              }
            }
          }
          case REMOVE_VOTE_OF_A_QUESTION :
            return {
              ...state,
              [action.questid] : {
                ...state[action.questid],
                [action.answer] : {
                  ...state[action.questid][action.answer],
                  votes : state[action.questid][action.answer]
                    .votes.filter((vote) => vote !== action.authUser)
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