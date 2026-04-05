import { Router } from "express";
import { tokenVerification } from "../middleware/auth.js";
import { leaderBoard } from "../controllers/leaderBoardController.js";

const router=Router();

router.get('/',tokenVerification,leaderBoard)
export default router