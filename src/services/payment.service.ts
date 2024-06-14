import Payment from "../models/payment.model";
import { IPayment, IPaymentOrderDto } from "../interfaces/payment.interface";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()



export default class PaymentService {
    async createPayment (data: IPayment) {
        const newPayment = Payment.create(data)
        return newPayment
    }

    generatePaymentOrder = async(data: IPaymentOrderDto ) => {
        try {
          
            const url = "https://api.paystack.co/transaction/initialize"
        const payOrder = await axios.post(url, {email: data.email, amount:`${100 * data.amount}`}, {headers: {"Content-type": "application/json", Authorization: process.env.PAYSTACK_KEY}})
        if (payOrder.data.status) {
            const payload = {email: data.email, amount: data.amount, status: "pending", reference: payOrder.data["data"].reference as string, access_code: payOrder.data["data"].access_code as string, authorization_url: payOrder.data["data"].authorization_url as string}
            return await this.createPayment(payload)
        } else {
            return {
                message: payOrder.data.message,
                success: false
            }
        }
        } catch(error) {
            console.error(error)
        }
        
    }
}




