import db from "../models";
import {IUsers} from "../../../../interfaces/models/iUsers";
import {CreateUserDTO} from "../../../../dto/createUserDTO";
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email: string): Promise<IUsers> => {

    // @ts-ignore
    return await db.users.findOne({
        where: {
            email: email
        }
    })
}

export const getUserByID = async (id: number): Promise<IUsers> => {

    // @ts-ignore
    return await db.users.findOne({
        where: {
            id: id
        }
    })
}

export const signUpUser = async (userDTO: CreateUserDTO): Promise<IUsers> => {
    const hash = bcrypt.hashSync(userDTO.password, Number(process.env.SALT_ROUNDS));
    try {
        // @ts-ignore
        const user = await db.users.findOne({
            where: {
                email: userDTO.email
            }
        });

        if (!user){
            // @ts-ignore
            return await db.users.create({
                firstName: userDTO.firstName,
                lastName: userDTO.lastName,
                email: userDTO.email,
                password_hash: hash,
                phoneNumber: userDTO.phoneNumber,
                gender: userDTO.gender
            });
        }else {
            throw new Error("Пользователь с таким Email уже существует")
        }
    }catch (e: any) {
        throw new Error(e.message)
    }
}