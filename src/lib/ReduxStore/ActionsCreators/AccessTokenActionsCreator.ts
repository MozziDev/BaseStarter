import {SET_ACCESS_TOKEN, UNSET_ACCESS_TOKEN} from "../Actions/accessToken";

export function setAccessToken(payload: string) {
    return {
        type: SET_ACCESS_TOKEN,
        payload: payload
    };
}

export function unsetAccessToken() {
    return {
        type: UNSET_ACCESS_TOKEN,
        payload: ""
    };
}