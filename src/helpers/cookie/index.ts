import {CookieSerializeOptions} from "cookie";

export const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
// @ts-ignore
    maxAge: process.env.NEXT_MAX_LIVE_SECRET_KEY,
    path: "/"
}

export const cookieDeleteOptions: CookieSerializeOptions = {
    maxAge: -1
}