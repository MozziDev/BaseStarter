import {IUsers} from "../../interfaces/models/iUsers";
import jwt, {SignOptions} from "jsonwebtoken";
import {env} from "process";

export const jwtGenerate = (user: IUsers, options?: SignOptions) => {
    // @ts-ignore
    return jwt.sign({ id: user.id }, env.NEXT_JWT_SECRET, options)
}

export const verifyToken = async (token: string) => {
    // @ts-ignore
    return jwt.verify(token, env.NEXT_JWT_SECRET);
}

export const getTokenFromAuthorization = (fullToken: string) => {
    return fullToken.split(" ")[1];
}