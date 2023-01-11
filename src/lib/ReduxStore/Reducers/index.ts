import {combineReducers} from "redux";
import userAuthReducer from "./userAuth";
import isLoginReducer from "./isLogIn";
import accessTokenReducer from "./accessToken";

/**
 *     userAuth: Данные авторизованного пользователя
 *     isLogin: Авторизованный/неавторизованный пользователь
 */
const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    isLogin: isLoginReducer,
    accessToken: accessTokenReducer
});

export default rootReducer;