import Application from "../models/application.model.js";
import Job from "../models/job.model.js";


export const sendApplication = async (req, res) => {
    try {
        const {
            jobId,
            fullname,
            email,
            phone,
            address,
            resumeLink
        } = req.body;
        if (!fullname || !email || !phone || !address || !resumeLink) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (!email.includes("@")) {
            return res.status(400).json({ message: "Please enter a valid email" })
        }
        if (phone.length < 10 || phone.length > 10) {
            return res.status(400).json({ message: "Please enter a valid phone number Eg.98XXXXXXXX" });
        }
        if (address.length < 3) {
            return res.status(400).json({ message: "Please enter a valid address" })
        }
        if (fullname.length < 3) {
            return res.status(400).json({ message: "Please enter a valid name" })
        }
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" })
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        // check if user has already applied for the job
        const existingApplication = await Application.findOne({ jobId, email });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // create new application
        const application = await Application.create({
            jobId,
            fullname,
            email,
            phone,
            address,
            resumeLink
        });


        job.applicationIds.push(application._id);
        await job.save();
        return res.status(201).json({ message: "Application submitted successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
        throw new Error("internal server error at send application controller ::", error.message);
    }
}
