import {UserAuthDTO} from "../../dto/userAuthDTO";
import {iUserAuthState} from "../../interfaces/states/iUserAuthState";
import userAuthState from "../../lib/ReduxStore/InitialStates/userAuthState";

export class ToStorage {

    protected isLogin: () => void;
    protected userAuthReducer: (userData: iUserAuthState) => void;
    protected accessToken: (token: string) => void;

    constructor(isLogin:()=>void, userAuthReducer: (userData: iUserAuthState)=>void, accessToken:(token: string)=>void ) {
        this.isLogin = isLogin
        this.userAuthReducer = userAuthReducer
        this.accessToken = accessToken
    }

    logIn(userAuth: UserAuthDTO) {
        this.isLogin();
        this.userAuthReducer({
            id: userAuth.data.user.id,
            firstName: userAuth.data.user.firstName,
            lastName: userAuth.data.user.lastName,
            email: userAuth.data.user.email,
            phoneNumber: userAuth.data.user.phoneNumber,
            gender: userAuth.data.user.gender,
        })
        this.accessToken(userAuth.data.accessToken);
    }

    logOut(){
        this.isLogin();
        this.userAuthReducer(userAuthState)
        this.accessToken("");
    }
}