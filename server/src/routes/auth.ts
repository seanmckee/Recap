import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/Users.js";


const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if (user) {
        return res.json({message: "User already exists"});
    }
    console.log("password: " + password)
    // if (!password) {
    //     console.log("NO PASSOWRD FOUND IN BODY")
    // }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();
    res.json({message: "User Registered Successfully"});
});

router.post("/login", async (req : any, res : any) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if (! user) {
        return res.json({message: "User does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (! isPasswordValid) {
        return res.json({message: "Username or Password is Incorrect"});
    }

    const token = jwt.sign({
        id: user._id
    }, "secret");
    res.json({token, userID: user._id});
});

export {
    router as authRouter
};


export const verifyToken = (req : any, res : any, next : any) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err : any) => {
            if (err) 
                return res.sendStatus(403);
            


            next();
        });
    } else {
        res.sendStatus(401);
    }
};
