import {SET_IS_LOGIN_FALSE, SET_IS_LOGIN_TRUE} from "../Actions/isLogIn";

export function setIsLogin() {
    return {
        type: SET_IS_LOGIN_TRUE,
        payload: true
    };
}

export function unsetIsLogin() {
    return {
        type: SET_IS_LOGIN_FALSE,
        payload: false
    };
}