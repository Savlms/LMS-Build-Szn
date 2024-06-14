import mongoose, {Document} from "mongoose";

export interface IPayment  {
    email: string;
    amount: number;
    status: string;
    reference: string;
    access_code?: string;
    authorization_url?: string;
}

export interface IPaymentOrderDto {
    email: string;
    amount: number;
}