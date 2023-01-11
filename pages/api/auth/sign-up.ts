import type { NextApiRequest, NextApiResponse } from 'next'
import {signUpUser} from "../../../src/configs/sequelize/database/services/users";
import {jwtGenerate} from "../../../src/helpers/JWT";
import cookie from "cookie";
import {cookieOptions} from "../../../src/helpers/cookie";
import {accessTokenOptions, refreshTokenOptions} from "../../../src/configs/jwt/options";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'POST') {
        // @ts-ignore
        try {
            const newUser = await signUpUser(req.body);
            let accessToken;
            let refreshToken;

            if (newUser) {
                accessToken = jwtGenerate(newUser, accessTokenOptions);
                refreshToken = jwtGenerate(newUser, refreshTokenOptions);
                await newUser.update({
                    refreshToken
                });
                await newUser.save();
                res.setHeader('Set-Cookie', cookie.serialize("refreshToken", refreshToken, cookieOptions));
            }
            res.status(200).json({ status: true, message: "", data: { accessToken, user: newUser } });
        }catch (e: any) {
            res.status(500).json({
                status: false,
                message: e.message,
                data: null
            })
        }
    }
}
