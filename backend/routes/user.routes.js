import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/user.controller.js";

router.post("/register", [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters'),
    body('fullname.lastname').isLength({min: 3}).withMessage('Last name must be at least 3 characters'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters')
],
    registerUser
)

router.post("/login",  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 5}).withMessage("Password must be of atleast 5 characters")
],
loginUser
)

export default router;