import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import React from "react";
import {FormikProps} from "formik/dist/types";

const UserEditFormFragment = ({formik, modify = false}:   {formik: FormikProps<{
        id: number,
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
        gender: string;
    }>, modify?: boolean}) => {
    return <>
        <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Имя"
            size={"small"}
            sx={{mb: 2}}
            required={true}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Фамилия"
            size={"small"}
            sx={{mb: 2}}
            required={true}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
        />
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

        {
            (modify)? <></> : <TextField
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
        }

        <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Телефон"
            size={"small"}
            sx={{mb: 2}}
            required={true}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label"
                       error={formik.touched.gender && Boolean(formik.errors.gender)}
            >Пол</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={formik.values.gender}
            >
                <FormControlLabel value="f"
                                  onClick={()=>formik.setFieldValue("gender", "f")}
                                  control={<Radio />} label="Ж" />
                <FormControlLabel
                    onClick={()=>formik.setFieldValue("gender", "m")}
                    value="m" control={<Radio />} label="М" />
            </RadioGroup>
        </FormControl>
    </>
}

export default UserEditFormFragment;