import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDb connected successfully", conn.connection.host)
    } catch (error) {
        throw new Error("Error in db connection ::: Message ::: ", error)
    }
}