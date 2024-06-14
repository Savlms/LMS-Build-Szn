import { required } from "joi";
import { Schema, Types, model } from "mongoose";

//define user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        trim: true,
        enum: ['guest', 'admin', 'superadmin'],
        default: 'guest'
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    resetToken: {
        type: String,
        required: false
    },
    tokenExpiration: {
        type: Date,
        required: false
    },
    path: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})
// userSchema.pre('save', async function (next) {
//     if(this.isNew || this.isModified('password')) {
//         const salt = await bcryptjs.genSalt(4);
//         const hashedPassword = await bcryptjs.hash(this.password, salt)
//         this.password = hashedPassword
//     }
//     next()
// })

const userModel = model('user', userSchema)
export default userModel