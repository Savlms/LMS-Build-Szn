import { ObjectId } from "mongoose";

export default interface IUser {
    _id?: any;
    email: string;
    role: string;
    password: string;
    resetToken?: string | null | undefined;
    tokenExpiration?: Date | null | undefined;
    path?: string | null | undefined;
}