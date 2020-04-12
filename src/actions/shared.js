import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { _saveQuestion,_saveQuestionAnswer } from '../utils/_DATA'
import { saveQuestionOfUser, removeQuestionOfUser,getUsers } from './users'
import { saveVoteOfAQuestion,removeVoteOfAQuestion,fetchQuestions } from './questions'


export function handlerSaveQuestion (user, optOne, optTwo) {
  const question_main = {
    user: user,
    optOne: optOne,
    optTwo: optTwo
  }
  return (dispatch) => {
    return _saveQuestion(question_main).then((quest) => {
      dispatch(saveQuestionOfUser(quest))
      dispatch(saveQuestionOfUser(quest.user, quest.id))
    }).catch(() => {
      dispatch(removeQuestionOfUser(question_main))
      dispatch(removeQuestionOfUser(question_main.user, question_main.id))
      alert('An Error Occured!!. Please try again')
    })
  }
}

export function handlerVoteOperation (authedUser, quest_id, ans) {
  return (dispatch) => {
    dispatch(saveVoteOfAQuestion(authedUser, quest_id, ans))
    dispatch(saveVoteOfAQuestion(authedUser, quest_id, ans))
    return _saveQuestionAnswer({
      authedUser: authedUser,
      quest_id: quest_id,
      ans: ans
    }).catch(() => {
      dispatch(removeVoteOfAQuestion(authedUser, quest_id, ans))
      dispatch(removeVoteOfAQuestion(authedUser, quest_id, ans))
      alert('An Error Occured!!. Please try again.')
    })
  }
}

export function fetchData () {
  return (dispatch) => Promise.all([
    dispatch(showLoading()),
    dispatch(getUsers()),
    dispatch(fetchQuestions())
  ]).then(() => {
    dispatch(hideLoading())
  })
}