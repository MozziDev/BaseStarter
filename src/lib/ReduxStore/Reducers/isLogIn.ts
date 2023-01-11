import isLogInState from "../InitialStates/isLogInState";
import {SET_IS_LOGIN_FALSE, SET_IS_LOGIN_TRUE} from "../Actions/isLogIn";

const isLogin =  (state = isLogInState, action: any) => {
    switch(action.type) {
        case SET_IS_LOGIN_TRUE: return {
            ...state,
            isLogin: true
        }
        case SET_IS_LOGIN_FALSE: return {
            ...state,
            isLogin: false
        }
        default: return state;
    }
}

export default isLogin;