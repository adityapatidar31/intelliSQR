import express from "express";
import { loginUser, signUpUser } from "../controllers/authController";

const router = express.Router();

router.route("/signUp").post(signUpUser);
router.route("/login").post(loginUser);

export default router;
