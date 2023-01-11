import {SET_USER_AUTH, UNSET_USER_AUTH} from "../Actions/userAuth";
import userAuthState from "../InitialStates/userAuthState";

export function setUserAuth(value:any) {
    return {
        type: SET_USER_AUTH,
        payload: value
    };
}

export function unsetUserAuth() {
    return {
        type: UNSET_USER_AUTH,
        payload: userAuthState
    };
}