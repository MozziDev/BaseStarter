import type { NextApiRequest, NextApiResponse } from 'next'
import {jwtGenerate, verifyToken} from "../../../src/helpers/JWT";
import {getUserByID} from "../../../src/configs/sequelize/database/services/users";
import {JwtPayload} from "jsonwebtoken";
import {accessTokenOptions} from "../../../src/configs/jwt/options";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
        if (req.cookies.refreshToken){
            try {
                const current: JwtPayload | string = await verifyToken(req.cookies.refreshToken);
                if (current) {
                    const user = await getUserByID(current.id);
                    if (!user) throw "User not found";

                        // @ts-ignore
                        const accessToken: JwtPayload | string = jwtGenerate(user, accessTokenOptions);
                        res.status(200).json(accessToken)

                }

            }catch (e) {
                res.status(401).json("Пользователь не авторизован")
            }
        }else{
            res.status(401).json("Пользователь не авторизовани")
        }

}
