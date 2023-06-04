// let express = require("express");
// let dotenv = require("dotenv");
// let cors = require("cors");
// let mongoose = require("mongoose");
// let {authRouter} = require("./models/Users")
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
mongoose.connect("mongodb+srv://seanmingmckee:Killjoy100!@cluster0.usrwv7v.mongodb.net/?retryWrites=true&w=majority");
app.listen(3001, () => console.log("SERVER STARTED"));
