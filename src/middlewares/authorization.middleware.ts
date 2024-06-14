import { NextFunction, Request, Response } from "express";
import AuthRequest from "../interfaces/authRequest.interface";

async function authorize (req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthRequest).user
    if (!user) {
        return res.status(401).send({
            message: "User does not exist",
            success: false
        })
    }
    if ((user.role === "admin") || (user.role === "Superadmin")) {
        next()
    } else {
        return res.status(404).send({
            message: `You are not the admin`,
            success: false
        })
    }
}

//  async function authorizeSuperadmin (req: Request, res: Response, next: NextFunction) {
//     const user = (req as AuthRequest).user
//     if (user.role === "Superadmin") {
//         next()
//     } else {
//         return res.status(404).send({
//             message: `You are not the Superadmin`,
//             success: false
//         })
//     }
//}


export default authorize; /*authorizeSuperadmin*/