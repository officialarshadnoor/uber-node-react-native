import blacklistTokenSchema from "../models/blackListToken.model.js";
import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        // Check if the user already exists
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create the new user
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        // Generate an auth token
        const token = user.generateAuthToken();

        // Respond with the created user and token
        res.status(201).json({ token, user });
    } catch (err) {
        next(err); // Pass errors to the error-handling middleware
    }
};

export const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist) {
        return res.status(400).json({message: 'User already exists'});
    }

    const user = await userModel.findOne({email}).select("+password");

    if (!user) return res.status(401).json({message: "Invalid email or password"});

    const isMatch = await user.comparePassword(password);

    if (!isMatch) res.status(401).json({message: "Invalid email or password"});

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({token, user});
}

export const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenSchema.create({token});

    res.json(200).json({message: "Logged out"});
}