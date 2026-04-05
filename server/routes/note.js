import { Router } from "express";
import { uploadMiddleware } from "../middleware/upload.js";
import {
  deleteNotes,
  downloadNotes,
  getMyNotes,
  getNotes,
  rateNotes,
  trendingNotes,
  uploadNotes,
} from "../controllers/noteController.js";
import { tokenVerification } from "../middleware/auth.js";
const router = Router();

router
  .post(
    "/upload",
    tokenVerification,
    uploadMiddleware.single("file"),
    uploadNotes,
  )
  .get("/", tokenVerification, getNotes)
  .get("/trending", tokenVerification, trendingNotes)
  .get("/my", tokenVerification, getMyNotes)

  .get("/:id/download", tokenVerification, downloadNotes)
  .delete("/:id", tokenVerification, deleteNotes)
  .post("/:id/rate", tokenVerification, rateNotes);

export default router;
