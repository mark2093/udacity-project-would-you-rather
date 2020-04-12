import { _getQuestions } from '../utils/_DATA'
import {showLoading, hideLoading} from 'react-redux-loading';

export const SAVE_A_QUESTION = 'SAVE_A_QUESTION'
export const REMOVE_A_QUESTION = 'REMOVE_A_QUESTION'
export const SAVE_VOTE_OF_A_QUESTION = 'SAVE_VOTE_OF_A_QUESTION'
export const REMOVE_VOTE_OF_A_QUESTION = 'REMOVE_VOTE_OF_A_QUESTION'
export const UPDATE_A_QUESTIONS = 'UPDATE_A_QUESTIONS'

export function saveAQuestion (question) {
    return {
      type: SAVE_A_QUESTION,
      question
    }
  }
  
  export function removeAQuestion (question) {
    return {
      type: REMOVE_A_QUESTION,
      question
    }
  }
  
  export function saveVoteOfAQuestion (authUser, questid, answer) {
    return {
      type: SAVE_VOTE_OF_A_QUESTION,
      authUser,
      questid,
      answer
    }
  }
  
  export function removeVoteOfAQuestion (auth, questid, answer) {
    return {
      type: REMOVE_VOTE_OF_A_QUESTION,
      auth,
      questid,
      answer
    }
  }
  
   export function updateAQuestion (questions) {
    return {
      type: UPDATE_A_QUESTIONS,
      questions,
    }
  }
  
    export function fetchQuestions () {
    return (dispatch) => {
        dispatch(showLoading());
        return _getQuestions()
            .then((questions) => {
                dispatch(updateAQuestion(questions));
                dispatch(hideLoading());
      })
    }
}