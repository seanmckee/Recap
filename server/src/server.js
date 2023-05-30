import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, {mongo} from "mongoose";

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://seanmingmckee:Killjoy100!@cluster0.usrwv7v.mongodb.net/?retryWrites=true&w=majority");

app.listen(3001, () => console.log("SERVER STARTED"));
