import {Model} from "sequelize";

export interface iUserAuthState {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: string,
}