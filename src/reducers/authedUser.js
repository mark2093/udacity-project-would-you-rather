import {
    AUTHED_SIGN_IN, 
    AUTHED_SIGN_OUT
} from "../actions/auth";

    export default function authedUser (state = null, action) {
        switch (action.type) {
            case AUTHED_SIGN_IN:
            return {
                ...state,
                authenticated_User: action.authenticated_User,
                siggnedInUser: action.siggnedInUser
            };
            case AUTHED_SIGN_OUT:
            return {
                ...state,
                authenticated_User: action.authenticated_User,
                siggnedInUser: action.siggnedInUser
            };
            default:
                return state;
        }
    }