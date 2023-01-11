import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserByID} from "../../../src/configs/sequelize/database/services/users";
import cookie from "cookie";
import {cookieDeleteOptions, cookieOptions} from "../../../src/helpers/cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'POST') {
        const user = await getUserByID(req.body.id);
        await user.update({
            refreshToken: null
        });
        await user.save();

        res.setHeader('Set-Cookie', cookie.serialize("refreshToken", "", cookieDeleteOptions));

        res.status(200).json({ status: true, message: "Выход произведен!", data: null });
    }
}
