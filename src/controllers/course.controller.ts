import { Request, Response } from "express";
import productDesign from "../mockdb/course/productdesign.mockdb"
import frontend from "../mockdb/course/frontend.mockdb";
import backend from "../mockdb/course/backend.mockdb";
import web3 from "../mockdb/course/web3.mockdb";
import UserService from "../services/user.service";
import AuthRequest from "../interfaces/authRequest.interface";
const {
    update
} = new UserService();

export default class CourseController {

    async getProductDesign(_req: Request, res: Response) {
        return res.status(200).send({
            message: 'Fetched successfully',
            success: true,
            data: productDesign
        })
    }

    async getFrontend(_req: Request, res: Response) {
        return res.status(200).send({
            message: 'Fetched successfully',
            success: true,
            data: frontend
        })
    }

    async getBackend(_req: Request, res: Response) {
        return res.status(200).send({
            message: 'Fetched successfully',
            success: true,
            data: backend
        })
    }

    async getWeb3(_req: Request, res: Response) {
        return res.status(200).send({
            message: 'Fetched successfully',
            success: true,
            data: web3
        })
    }

    async enroll(req: Request, res: Response) {
        const paths = ["Product Design", "Frontend", "Backend", "Web3"];
        const path = paths[Number(req.params.path) - 1];

        const user = await update((req as AuthRequest).user!._id, { path: path })

        return res.status(200).send({
            message: 'Fetched successfully',
            success: true,
            data: user
        })
    }

}