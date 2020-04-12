import { _getUsers } from '../utils/_DATA'
import {showLoading, hideLoading} from 'react-redux-loading';

export const SAVE_A_QUESTION = 'SAVE_USER_QUESTION'
export const REMOVE_A_QUESTION = 'REMOVE_USER_QUESTION'
export const SAVE_A_ANSWER = 'SAVE_USER_ANSWER'
export const REMOVE_A_ANSWER = 'REMOVE_USER_ANSWER'
export const USERS_UPDATE = 'USERS_UPDATE'

export function saveQuestionOfUser (authedUser, ques_id) {
    return {
      type: SAVE_A_ANSWER,
      authedUser,
      ques_id,
    }
  }
  
  export function removeQuestionOfUser (authedUser, ques_id) {
    return {
      type: SAVE_A_QUESTION,
      authedUser,
      ques_id,
    }
  }
  
  export function saveAAnswer (authedUser, ques_id, answer_opt) {
    return {
      type: SAVE_A_ANSWER,
      authedUser,
      ques_id,
      answer_opt
    }
  }
  
  export function removeAAnswer (authedUser, ques_id, answer_opt) {
    return {
      type: REMOVE_A_ANSWER,
      authedUser,
      ques_id,
      answer_opt
    }
  }
  
  
  export function usersUpdate (authedUsers) {
    return {
      type: USERS_UPDATE,
      authedUsers,
    }
  }
  
    export function getUsers () {
    return (dispatch) => {
        dispatch(showLoading());
      return _getUsers()
        .then((users) => {
        dispatch(usersUpdate(users));
        dispatch(hideLoading());
      })
    }
  }