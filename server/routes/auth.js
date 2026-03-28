import { Router } from "express";

import { register, login, getMe } from "../controllers/authController.js";
import { tokenVerification } from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get('/me',tokenVerification, getMe)

export default authRouter;
