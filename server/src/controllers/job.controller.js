import Job from "../models/job.model.js";

export const getAllJobs = async (req, res) => {
    try {
        const alljobs = await Job.find();
        console.log(alljobs)
        res.status(200).json({ alljobs });

    } catch (error) {
        console.log("Error in getting all jobs controller::",error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAjob = async (req, res) => {
    const {id} = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        const job = await Job.findById(id);
        if (job) {
            return res.status(200).json({ job });
        } else {
            return res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        throw new Error("Error in getting a job controller :: ", error.message);
    }

}   

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            salary,
            tags,
            location,
            remote,
            type,
            experienceLevel,
            active
        } = req.body;

        if (!title || !description || !salary || !tags || !location || !remote || !type || !experienceLevel) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }
        if (isNaN(salary)) {
            return res.status(400).json({ message: "Salary must be a number" });
        }
        if (!['Onsite', 'Remote', 'Hybrid'].includes(remote)) {
            return res.status(400).json({ message: "Remote must be one of the following: Onsite, Remote, Hybrid" });
        }
        if (!['Full-time', 'Part-time'].includes(type)) {
            return res.status(400).json({ message: "Type must be one of the following: Full-time, Part-time" });
        }
        if (!['Internship', 'Mid-Level', 'Junior', "Senior"].includes(experienceLevel)) {
            return res.status(400).json({ message: "Experience Level must be one of the following: Internship, Mid-Level, Junior, Senior" });
        }
        if (typeof tags !== 'object' || Array.isArray(tags) === false) {
            return res.status(400).json({ message: "Tags must be an array of strings" });
        }
        if (typeof active !== 'boolean' && typeof active !== 'undefined') {
            return res.status(400).json({ message: "Active must be a boolean value" });
        }
        const newJob = new Job({
            title,
            description,
            salary,
            tags,
            location,
            remote,
            type,
            experienceLevel,
            active
        });
        if (newJob) {
            await newJob.save();
            res.status(201).json({ message: "Job posted successfully" });
        } else {
            res.status(500).json({ message: "Failed to post job" });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        throw new Error("Error in posting job controller :: ", error.message);
    }
}


export const deleteJob = async (req, res) => {

    try {
        const { jobId } = req.body;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (deletedJob) {
            return res.status(200).json({ message: "Job deleted successfully" });
        } else {
            return res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        throw new Error("Error in deleting job controller :: ", error.message);
    }

}


export const editJob = async (req, res) => {
    try {
        const { jobId, ...updateData } = req.body;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }
        if (!updateData.name || !updateData.description || !updateData.salary || !updateData.tags || !updateData.location || !updateData.remote || !updateData.type || !updateData.experienceLevel) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        if (isNaN(updateData.salary)) {
            return res.status(400).json({ message: "Salary must be a number" });
        }
        if (!['Onsite', 'Remote', 'Hybrid'].includes(updateData.remote)) {
            return res.status(400).json({ message: "Remote must be one of the following: Onsite, Remote, Hybrid" });
        }
        if (!['Full-time', 'Part-time'].includes(updateData.type)) {
            return res.status(400).json({ message: "Type must be one of the following: Full-time, Part-time" });
        }
        if (!['Internship', 'Mid-Level', 'Junior', "Senior"].includes(updateData.experienceLevel)) {
            return res.status(400).json({ message: "Experience Level must be one of the following: Internship, Mid-Level, Junior, Senior" });
        }
        if (typeof updateData.tags !== 'object' || Array.isArray(updateData.tags) === false) {
            return res.status(400).json({ message: "Tags must be an array of strings" });
        }
        if (typeof updateData.active !== 'boolean' && typeof updateData.active !== 'undefined') {
            return res.status(400).json({ message: "Active must be a boolean value" });
        }


        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (updatedJob) {
            return res.status(200).json({ message: "Job updated successfully", updatedJob });
        } else {
            return res.status(404).json({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        throw new Error("Error in editing job controller :: ", error.message);
    }
}


export const getApplications = async (req, res) => {

    try {
        const {jobId}  = req.params;
        if(!jobId){
            return res.status(400).json({message: "Job ID is required"});
        }
        const applications = await Job.findById(jobId).populate('applicationIds');
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found" });
        }
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        throw new Error("Error in getting applications controller :: ", error.message);
    }

}