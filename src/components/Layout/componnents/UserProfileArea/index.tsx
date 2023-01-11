import {Button} from "@mui/material";
import * as React from "react";
import {useRouter} from "next/router";
import UserMenu from "../HeaderAppBar/UserMenu";
import {iUserAuthState} from "../../../../interfaces/states/iUserAuthState";
import {setUserAuth} from "../../../../lib/ReduxStore/ActionsCreators/UserAuthActionsCreator";
import {setIsLogin} from "../../../../lib/ReduxStore/ActionsCreators/isLoginActionsCreator";
import {setAccessToken} from "../../../../lib/ReduxStore/ActionsCreators/AccessTokenActionsCreator";
import {connect} from "react-redux";

const UserProfileArea = ({isLogin}: {isLogin: {isLogin: boolean}}) => {
  const route = useRouter();
  return <>
      {
          (isLogin.isLogin)? <>
            <UserMenu />
          </> : <>
            <Button sx={{ color: 'white', textTransform: "none" }} onClick={()=>route.push("/sign-up")}>Sign-Up</Button>
            <Button sx={{ color: 'white', textTransform: "none" }} onClick={()=>route.push("/sign-in")}>Sign-In</Button>
          </>
      }
  </>
}


const allStateToProps = function(state:any) {
  return {
    isLogin: state.isLogin,
  }
}

export default connect(allStateToProps)(UserProfileArea);