import IAdminId from "../interfaces/adminId.interface";
import AdminId from "../models/adminID.model";

export default class AdminIdServices {
    //create admin id
    async createAdminId (adminId: IAdminId) {
        const newAdminId = await AdminId.create(adminId)
        console.log(newAdminId)
        return newAdminId
    }

    //get admin  by id
    async getAdminId (id: string) {
        const adminid = await AdminId.findById(id)
        return adminid
    }
    async getAdminIdByEmail (email: string) {
        const adminid = await AdminId.findOne({email: email})
        return adminid
    }
    //get all admin id 
    async getAllAdminId () {
        const allAdminId = await AdminId.find({})
        return allAdminId
    }
    //delete admin id
    async deleteAdminId (id: string) {
        const erase = await AdminId.findByIdAndDelete(id)
    }
}