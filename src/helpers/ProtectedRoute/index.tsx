 import React, {useEffect} from "react";
 import {useRouter} from "next/router";
 import {SharedPage} from "../../configs/SharedPage";
 import {connect} from "react-redux";

 const ProtectedRoute = ({children, isLogin}: {children: React.ReactNode, isLogin: {isLogin: boolean}}) => {

    const router = useRouter();

     useEffect(()=>{

         if (!isLogin.isLogin && !SharedPage.includes(router.pathname)){
             router.push('/sign-in').then(()=>{});
         }

    }, [router, isLogin]);

    return <>
        { children }
    </>
}

 const allStateToProps = function(state:any) {
     return {
         isLogin: state.isLogin,
     }
 }

 export default connect(allStateToProps)(ProtectedRoute);

