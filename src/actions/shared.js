import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  _saveQuestion,
  _saveQuestionAnswer } from '../utils/_DATA'
import {
  saveQuestionOfUser, removeQuestionOfUser,saveAAnswer,removeAAnswer,fetchUsers  } from './users'
import {
  saveVoteOfAQuestion,removeVoteOfAQuestion,fetchQuestions,saveAQuestion,removeAQuestion } from './questions'

export function handleCreateAQuestion (author, optionOneText, optionTwoText) {
  const question = {
    author: author,
    optionOneText: optionOneText,
    optionTwoText: optionTwoText
  }
  return (dispatch) => {
    return _saveQuestion(question).then((q) => {
      dispatch(saveAQuestion(q))
      dispatch(saveQuestionOfUser(q.author, q.id))
    }).catch(() => {
      dispatch(removeAQuestion(question))
      dispatch(removeQuestionOfUser(question.author, question.id))
      alert('An Error Occured!!. Please try again.')
    })
  }
}

export function handleQuestionPoll (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(saveVoteOfAQuestion(authedUser, qid, answer))
    dispatch(saveAAnswer(authedUser, qid, answer))
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer
    }).catch(() => {
      dispatch(removeVoteOfAQuestion(authedUser, qid, answer))
      dispatch(removeAAnswer(authedUser, qid, answer))
      alert('An Error Occured!!. Please try again.')
    })
  }
}

export function fetchInitialData () {
  return (dispatch) => Promise.all([
    dispatch(showLoading()),
    dispatch(fetchUsers()),
    dispatch(fetchQuestions())
  ]).then(() => {
    dispatch(hideLoading())
  })
}
