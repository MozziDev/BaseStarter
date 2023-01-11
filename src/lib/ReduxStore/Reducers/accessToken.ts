import accessTokenState from "../InitialStates/accessToken";
import {SET_ACCESS_TOKEN, UNSET_ACCESS_TOKEN} from "../Actions/accessToken";

const accessToken =  (state = accessTokenState, action: any) => {
    switch(action.type) {
        case SET_ACCESS_TOKEN: return {
            ...state,
            accessToken: action.payload
        }
        case UNSET_ACCESS_TOKEN: return {
            ...state,
            accessToken: ""
        }
        default: return state;
    }
}

export default accessToken;