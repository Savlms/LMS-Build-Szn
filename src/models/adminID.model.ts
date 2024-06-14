import mongoose, { Types } from 'mongoose'

const AdminIdSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    adminId: {
        type: Types.ObjectId,
        ref: 'user',
        trim: true
    }
})

const AdminId = mongoose.model('adminid', AdminIdSchema)
export default AdminId;