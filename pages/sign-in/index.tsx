import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import axiosClient from "../../src/helpers/axios";
import Link from '@mui/material/Link';
import Copyright from "../../src/components/Copyrights";
import {apiHost} from "../../src/configs/app";
import {useRouter} from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import {AxiosResponse} from "axios";
import {UserAuthDTO} from "../../src/dto/userAuthDTO";
import {connect} from "react-redux";
import {setUserAuth} from "../../src/lib/ReduxStore/ActionsCreators/UserAuthActionsCreator";
import {iUserAuthState} from "../../src/interfaces/states/iUserAuthState";
import {setIsLogin} from "../../src/lib/ReduxStore/ActionsCreators/isLoginActionsCreator";
import {setAccessToken} from "../../src/lib/ReduxStore/ActionsCreators/AccessTokenActionsCreator";
import {ToStorage} from "../../src/services/auth/ToStorage";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Введите правильный Email')
        .required('Email обязателен к заполнению'),
    password: yup
        .string()
        .min(8, 'Длинна пароля минимум 8 символов')
        .required('Пароль обязателен к заполнению'),
});



const SignIn = ({userAuthReducer, isLogin, accessToken}: {
    userAuthReducer: (value: iUserAuthState)=>void,
    isLogin: ()=>void,
    accessToken: (token: string)=>void
}) => {
    const route = useRouter();
    const [login, setLogin] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLogin(true);
            const url = apiHost+"/api/auth/sign-in";
            await axiosClient.request({
                data: values,
                method: "post",
                url
            }).then((res: AxiosResponse<UserAuthDTO>)=>{

                const dataToLS = new ToStorage(isLogin, userAuthReducer, accessToken);
                dataToLS.logIn(res.data);

                route.push("/dashboard");
            }).finally(()=>{
                setLogin(false);
            });
        },
    });
    return <>
        <Container component="main" maxWidth="xs" sx={{minHeight: "100vh", pt: 10}}>
            <CssBaseline />
            <Box
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {
                    (!login)? <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar> : <CircularProgress />
                }


                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            size={"small"}
                            sx={{mb: 2}}
                            required={true}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Пароль"
                            type="password"
                            required={true}
                            size={"small"}
                            sx={{mb: 2}}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Войти
                        </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Забыл пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Нет аккаунта? Зарегистрировать"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </>
}

const allStateToProps = function(state:any) {
    return {
        userAuth: state.userAuth,
    }
}

const allReducer = {
    userAuthReducer:(value: iUserAuthState) => (setUserAuth(value)),
    isLogin: ()=>(setIsLogin()),
    accessToken: (value: string)=>( setAccessToken(value) )
}

export default connect(allStateToProps,allReducer)(SignIn);