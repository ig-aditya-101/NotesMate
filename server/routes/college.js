import { Router } from "express";
import { searchColleges } from "../controllers/collegeController.js";

const router = Router();

router.get("/", searchColleges);

export default router;
