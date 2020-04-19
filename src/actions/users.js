import { _getUsers } from '../utils/_DATA'
import {showLoading, hideLoading} from 'react-redux-loading';
export const SAVE_A_QUESTION = 'SAVE_A_QUESTION'
export const REMOVE_A_QUESTION = 'REMOVE_A_QUESTION'
export const SAVE_A_ANSWER = 'SAVE_A_ANSWER'
export const REMOVE_A_ANSWER = 'REMOVE_A_ANSWER'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export function saveQuestionOfUser (user, qid) {
  return {
    type: SAVE_A_QUESTION,
    user,
    qid,
  }
}

export function removeQuestionOfUser (user, qid) {
  return {
    type: REMOVE_A_QUESTION,
    user,
    qid,
  }
}

export function saveAAnswer (user, qid, answer) {
  return {
    type: SAVE_A_ANSWER,
    user,
    qid,
    answer
  }
}

export function removeAAnswer (user, qid, answer) {
  return {
    type: REMOVE_A_ANSWER,
    user,
    qid,
    answer
  }
}


export function receiveUsers(users) {
  return {
      type: RECEIVE_USERS,
      users
  }
}

/* async call to fetch all users */
export function fetchUsers () {
  return (dispatch) => {
    dispatch(showLoading());
    return _getUsers().then((users) => {
      dispatch(receiveUsers(users))
      dispatch(hideLoading());
    })
  }
}
