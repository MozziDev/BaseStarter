import {useFormik} from "formik";
import {apiHost} from "../../configs/app";
import axiosClient from "../../helpers/axios";
import {AxiosResponse} from "axios";
import {UserAuthDTO} from "../../dto/userAuthDTO";
import * as yup from "yup";
import UserEditFormFragment from "../UserEditFormFragment";
import {Box, Button} from "@mui/material";
import * as React from "react";
import ErrorSnackBar from "../SnackBars/ErrorSnackBar";

const validationSchema = yup.object({
    id: yup
        .number(),
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
    phoneNumber: yup
        .string()
        .required("Обязателен к заполнению"),
    gender: yup
        .string()
        .required("Обязателен к заполнению"),
});
const ProfileForm = ({data}: { data: any }) => {
    const formik = useFormik({
        initialValues: {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            password: '',
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gender
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const url = apiHost + "/api/users/update-user-by-id";
            await axiosClient.request({
                data: values,
                method: "patch",
                url
            }).then((res: AxiosResponse<UserAuthDTO>) => {
                console.log(res);
            });
        },
    });
    return <>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
            <UserEditFormFragment formik={formik} modify={true}/>
            <Button fullWidth variant={"contained"} type={"submit"}>Сохранить</Button>
        </Box>
    </>
}

export default ProfileForm;