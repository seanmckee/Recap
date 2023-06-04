var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield UserModel.findOne({ username });
    if (user) {
        return res.json({ message: "User already exists" });
    }
    console.log("password: " + password);
    // if (!password) {
    //     console.log("NO PASSOWRD FOUND IN BODY")
    // }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    yield newUser.save();
    res.json({ message: "User Registered Successfully" });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User does not exist" });
    }
    const isPasswordValid = yield bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is Incorrect" });
    }
    const token = jwt.sign({
        id: user._id
    }, "secret");
    res.json({ token, userID: user._id });
}));
export { router as authRouter };
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
