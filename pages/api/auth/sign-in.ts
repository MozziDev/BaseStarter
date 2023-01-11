import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserByEmail} from "../../../src/configs/sequelize/database/services/users";
import {jwtGenerate} from "../../../src/helpers/JWT";
import cookie from "cookie";
import {cookieOptions} from "../../../src/helpers/cookie";
import {accessTokenOptions, refreshTokenOptions} from "../../../src/configs/jwt/options";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'POST') {
        const user = await getUserByEmail(req.body.email);
        let accessToken;
        let refreshToken;

        if (user) {
            accessToken = jwtGenerate(user, accessTokenOptions);
            refreshToken = jwtGenerate(user, refreshTokenOptions);
            await user.update({
                refreshToken
            });
            await user.save();
            res.setHeader('Set-Cookie', cookie.serialize("refreshToken", refreshToken, cookieOptions));
        }
        res.status(200).json({ status: true, message: "", data: { accessToken, user:user } });
    }
}
