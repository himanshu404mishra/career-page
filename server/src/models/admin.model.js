import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isSuperAdmin: {
        type: Boolean,
        default:false
    },
    role: {
        type: String,
        default: "HR"
    }

}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema)


export default Admin