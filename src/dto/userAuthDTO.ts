import {IUsers} from "../interfaces/models/iUsers";

export interface UserAuthDTO {
    status: boolean,
    message: string,
    data: {
        accessToken: string,
        user: IUsers
    }
}