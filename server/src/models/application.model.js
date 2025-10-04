import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    fullname: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: {
         type: String, 
        required: true 
    },
    address: {
         type: String, 
        required: true 
    },
    jobId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    resumeLink: {
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;