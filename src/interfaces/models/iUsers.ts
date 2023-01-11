import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export interface IUsers extends Model{
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password_hash: string,
    email: string,
    phoneNumber: string,
    refreshToken: string,
    gender: string,
    status: string
}