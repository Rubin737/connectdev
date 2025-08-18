import express from "express";
import { signup } from "../controllers/auth/signup.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { onboard } from "../controllers/auth/onboard.js";
import { productRoute } from "../middleware/productRoute.js";
import { user } from "../controllers/auth/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/onboard", productRoute, onboard);
router.get("/currentuser", productRoute, user);

export default router;
