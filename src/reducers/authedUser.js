import {
  AUTHED_SIGN_IN,
  CURRENT_AUTHED_USER,
  AUTHED_SIGN_OUT } from '../actions/authedUser'

export default function authedUser (state = null, action) {
  switch (action.type) {
    case AUTHED_SIGN_IN :
   case CURRENT_AUTHED_USER :
    case AUTHED_SIGN_OUT :
      return action.id
    default :
      return state
  }
}
