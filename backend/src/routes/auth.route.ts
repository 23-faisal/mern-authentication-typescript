import { Router } from "express";
import registerHandler from "../controllers/auth/register.controller";

export const authRouter = Router();

// prefix /api/auth

authRouter.post("/register", registerHandler);

 