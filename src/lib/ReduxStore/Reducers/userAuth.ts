import {SET_USER_AUTH, UNSET_USER_AUTH} from "../Actions/userAuth";
import userAuthState from "../InitialStates/userAuthState";
import {iUserAuthState} from "../../../interfaces/states/iUserAuthState";


const userAuth =  (state: iUserAuthState = userAuthState, action: any) => {
    switch(action.type) {
        case SET_USER_AUTH: return {
            ...state,
            ...action.payload
        }
        case UNSET_USER_AUTH: return {
            ...state,
            ...userAuthState
        }
        default: return state;
    }
}

export default userAuth;