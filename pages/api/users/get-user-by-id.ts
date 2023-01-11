import type { NextApiRequest, NextApiResponse } from 'next'
import db from "../../../src/configs/sequelize/database/models"
import {getTokenFromAuthorization, verifyToken} from "../../../src/helpers/JWT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        // @ts-ignore
        const result = await db.users.findOne({
            where: {
                id: req.body.id
            }
        });
        res.status(200).json({status: true, message: "", data: result });
    }else{
        res.status(200).json({status: false, message: "Wrong method", data: null})
    }
}
