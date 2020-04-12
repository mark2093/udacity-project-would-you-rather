import {getUser} from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const AUTHED_SIGN_IN = 'SIGNOUT_SUCCESSFUL';
export const AUTHED_SIGN_OUT = 'SIGNOUT_SUCCESSFUL';

export function getAuthedLogin(authedUser) {
    return {
        type: AUTHED_SIGN_IN,
        authenticated_User: true,
        siggnedInUser: authedUser
    }
}

export function getAuthedLogout() {
    return {
        type: AUTHED_SIGN_OUT,
        authenticated_User: null,
        siggnedInUser: null
    }
}

export function handleAuthedUser(id) {
    return (dispatch) => {
        dispatch(showLoading());
        getUser(id).then((authedUser) => {
            dispatch(getAuthedLogin(authedUser));
            dispatch(hideLoading());
        });
    };
}

export function handlelogoutAuthedUser() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(getAuthedLogout());
        dispatch(hideLoading());
    }
}