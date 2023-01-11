import type { NextApiRequest, NextApiResponse } from 'next'
import db from "../../../src/configs/sequelize/database/models"
import {getTokenFromAuthorization, verifyToken} from "../../../src/helpers/JWT";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "GET") {
        if (req.headers.authorization){
            await verifyToken(getTokenFromAuthorization(req.headers.authorization)).then(async (tokenPayload)=>{
                // @ts-ignore
                const result = await db.users.findAll({
                    include: [
                        {
                            // @ts-ignore
                            model: db.posts,
                            attributes:["id", "title", "slug", "content", "status", "createdAt", "updatedAt"]
                        }
                    ]
                });
                res.status(200).json({status: true, message: "", data: result })
            }).catch(error=>{
                res.status(401).json({status: false, message: "Не авторизованный пользователь", data: null})
            });
        }
    }else{
        res.status(200).json({status: false, message: "Wrong method", data: null})
    }
}
