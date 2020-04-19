import {getUser} from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
export const AUTHED_SIGN_IN = 'AUTHED_SIGN_IN'
export const CURRENT_AUTHED_USER = 'CURRENT_AUTHED_USER'
export const AUTHED_SIGN_OUT = 'AUTHED_SIGN_OUT'

export function getAuthedLoggedin (id) {
  return {
    type: AUTHED_SIGN_IN,
    id,
  }
}

export function getCurrentAuthedUser () {
  return {
    type: CURRENT_AUTHED_USER,
  }
}

export function getAuthedLoggedout () {
  return {
    type: AUTHED_SIGN_OUT,
  }
}

export function handleAuthedUser(id) {
  return (dispatch) => {
      dispatch(showLoading());
      getUser(id).then((authedUser) => {
          dispatch(getAuthedLoggedin(authedUser));
          dispatch(hideLoading());
      });
  };
}

export function handlelogoutAuthedUser() {
  return (dispatch) => {
      dispatch(showLoading());
      dispatch(getAuthedLoggedout());
      dispatch(hideLoading());
  }
} 