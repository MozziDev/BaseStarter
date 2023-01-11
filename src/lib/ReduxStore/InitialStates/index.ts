import userAuthState from "./userAuthState";
import isLogInState from "./isLogInState";
import accessTokenState from "./accessToken";


const InitialState = {
    userAuth: userAuthState,
    isLogin: isLogInState,
    accessToken: accessTokenState
}

export default InitialState;