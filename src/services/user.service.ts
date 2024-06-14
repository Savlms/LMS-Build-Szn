import { isValidObjectId } from "mongoose";
import IUser from "../interfaces/user.interface";
import userModel from "../models/user.model";

export default class UserService {

    //create a user
    async create(data: IUser) {
        return await userModel.create(data)
    }

    //edit a user
    async update(id: string, update: Partial<IUser>) {
        return await userModel.findByIdAndUpdate(id, update, { new: true })
    }

    //find a single user by id 
    async findById(id: string) {
        return await userModel.findById(id)
    }

    //find a user by email
    async findByEmail(email: string) {
        // wrong model function used here
        return await userModel.findOne({ email: email })
    }

    //find all users
    async findAll() {
        return await userModel.find()
    }

    //find by filter
    async findOneByFilter(filter: object) {
        return await userModel.findOne(filter)
    }

    //delete a user
    async erase(id: string) {
        // didn't include a parameter for the function
        return await userModel.findByIdAndDelete
    }

    //validate object id
    async validateId(id: string) {
        // didn't include a parameter for the function
        return await isValidObjectId(id)
    }
}