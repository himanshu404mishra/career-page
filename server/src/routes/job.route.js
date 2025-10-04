import { Router } from "express";
import {getAllJobs,getAjob,postJob,deleteJob,editJob,getApplications} from "../controllers/job.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/all-jobs", getAllJobs);
router.get("/get-aJob/:id", getAjob);
router.post("/post-job", protectRoute, postJob);
router.delete("/delete-job", protectRoute, deleteJob);
router.put("/edit-job", protectRoute, editJob);
router.get("/get-applications/:jobId", protectRoute, getApplications);

export default router;
