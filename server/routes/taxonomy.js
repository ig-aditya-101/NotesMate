import { Router } from "express";
import {
  getBranches,
  getSubjects,
  getUniversities,
  getCourses,
  getSemesters,
} from "../controllers/taxanomyController.js";

const router = Router();

router
  .get("/universities", getUniversities)
  .get("/courses", getCourses)
  .get("/branches", getBranches)
  .get("/semesters", getSemesters)
  .get("/subject", getSubjects);

export default router;
