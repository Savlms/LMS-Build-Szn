import PaymentService from "../services/payment.service";
import { IPaymentOrderDto } from "../interfaces/payment.interface";
import { Request, Response } from "express";

const {
    createPayment,
    generatePaymentOrder
} = new PaymentService()

export default class PaymentController {
    async generatePaymentOrder (req: Request, res: Response) {
        const email = req.body.email
        const amount = req.body.amount
        const paymentOrder = await generatePaymentOrder({email, amount})
        if (paymentOrder) {
            return res.status(200).send({
                data: paymentOrder
            })
        }
    }
}