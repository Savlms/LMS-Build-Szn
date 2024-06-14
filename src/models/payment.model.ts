import mongoose, { Schema } from "mongoose"

const PaymentSchema = new Schema ({
    email: {
        type: String,
        required: true,
        ref: 'User',
    },
    amount: {
        type: Number,
        required:true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending',
    },
    reference: {
        type: String,
        required: true,
        unique: true,
    },
    access_code: {
        type: String,
    },
    authorization_url: {
        type: String,
    },
}, { timestamps: true })


const Payment = mongoose.model('Payment', PaymentSchema)
export default Payment