import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Copyright from "../../src/components/Copyrights";
import React, {useState} from "react";
import {useFormik} from "formik";
import {apiHost} from "../../src/configs/app";
import axiosClient from "../../src/helpers/axios";
import {AxiosResponse} from "axios";
import {UserAuthDTO} from "../../src/dto/userAuthDTO";
import * as yup from "yup";
import {useRouter} from "next/router";
import {ToStorage} from "../../src/services/auth/ToStorage";
import {setUserAuth} from "../../src/lib/ReduxStore/ActionsCreators/UserAuthActionsCreator";
import {setIsLogin} from "../../src/lib/ReduxStore/ActionsCreators/isLoginActionsCreator";
import {setAccessToken} from "../../src/lib/ReduxStore/ActionsCreators/AccessTokenActionsCreator";
import {connect} from "react-redux";
import {iUserAuthState} from "../../src/interfaces/states/iUserAuthState";
import UserEditFormFragment from "../../src/components/UserEditFormFragment";
import ErrorSnackBar from "../../src/components/SnackBars/ErrorSnackBar";
import {log} from "util";

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required("Обязателен к заполнению"),
    lastName: yup
        .string()
        .required("Обязателен к заполнению"),
    email: yup
        .string()
        .email('Введите правильный Email')
        .required('Email обязателен к заполнению'),
    password: yup
        .string()
        .min(8, 'Длинна пароля минимум 8 символов')
        .required('Пароль обязателен к заполнению'),
    phoneNumber: yup
        .string()
        .required("Обязателен к заполнению"),
    gender: yup
        .string()
        .required("Обязателен к заполнению"),
});

const SignUp = ({userAuthReducer, isLogin, accessToken}: {
    userAuthReducer: (value: iUserAuthState) => void,
    isLogin: () => void,
    accessToken: (token: string) => void
}) => {
    const [createUser, setCreateUser] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [messageErrorAlert, setMessageErrorAlert] = React.useState("");

    const route = useRouter();
    const formik = useFormik({
        initialValues: {
            id: 0,
            firstName: "",
            lastName: "",
            email: '',
            password: '',
            phoneNumber: '',
            gender: "f"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setCreateUser(true);
            const url = apiHost + "/api/auth/sign-up";
            await axiosClient.request({
                data: values,
                method: "post",
                url
            }).then((res: AxiosResponse<UserAuthDTO>) => {

                const dataToLS = new ToStorage(isLogin, userAuthReducer, accessToken);
                dataToLS.logIn(res.data);

                route.push("/dashboard");
            }).catch(reason => {
                if (!reason.response.data.status) {
                    setMessageErrorAlert(reason.response.data.message);
                    setOpenErrorAlert(true);
                }
            })
                .finally(() => {
                    setCreateUser(false);
                });
        },
    });
    return <>
        <Container component="main" maxWidth="xs" sx={{minHeight: "100vh", pt: 10}}>
            <CssBaseline/>
            <ErrorSnackBar message={messageErrorAlert} open={openErrorAlert} setOpen={setOpenErrorAlert}/>

            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
                    <UserEditFormFragment formik={formik}/>
                    <Button color="primary" variant="contained" fullWidth type="submit"
                            startIcon={(createUser) ? <CircularProgress size={20} sx={{color: "#ffffff"}}/> : <></>}
                    >
                        Зарегистрировать
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    </>
}

const allStateToProps = function (state: any) {
    return {
        userAuth: state.userAuth,
    }
}

const allReducer = {
    userAuthReducer: (value: iUserAuthState) => (setUserAuth(value)),
    isLogin: () => (setIsLogin()),
    accessToken: (value: string) => (setAccessToken(value))
}

export default connect(allStateToProps, allReducer)(SignUp);