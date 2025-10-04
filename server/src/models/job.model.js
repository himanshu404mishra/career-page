import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    tags: {
        type: [], //eg:- Develoment, FrontEnd, Deginer, Management, etc
        required: true,
    },
    location: { type: String, required: true },
    remote: {
        type: String,
        enum: {
            values: ['Onsite', 'Remote', 'Hybrid'], // Allowed values for 'type'
            message: '{VALUE} is not a valid status' // Custom error message
        },
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ['Full-time', 'Part-time'], // Allowed values for 'type'
            message: '{VALUE} is not a valid type' // Custom error message
        },
        required: true
    },
    experienceLevel: {
        type: String,
        enum: {
            values: ['Internship', 'Mid-Level', 'Junior', "Senior"], // Allowed values for 'type'
            message: '{VALUE} is not a valid type' // Custom error message
        },
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    applicationIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Application' }
    ]

}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema)

export default Job
