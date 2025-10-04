import { Router } from "express";
import {sendApplication} from "../controllers/application.controller.js";


const router = Router();

router.post("/send-application", sendApplication)

export default router;
