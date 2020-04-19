
import {
  AUTHED_SIGN_IN,
  CURRENT_AUTHED_USER,
  AUTHED_SIGN_OUT } from '../actions/authedUser'

const CURRENT_USER = 'authedUser'
const COOKIE_TIME = 1

const authedUser = (store) => (next) => (action) => {
  switch (action.type) {

    case AUTHED_SIGN_IN :
      setCookie(CURRENT_USER, action.id, COOKIE_TIME)
      return next(action)

    case CURRENT_AUTHED_USER :
      const authedUser = getCookie(CURRENT_USER)
      action.id = authedUser ? authedUser : null
      return next(action)

    case AUTHED_SIGN_OUT :
      setCookie(CURRENT_USER, action.id, -1)
      action.id = null
      return next(action)

    default :
      return next(action)
  }
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default authedUser
