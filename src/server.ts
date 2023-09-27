import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {loginUser} from "./controllers/loginController"


const app: Application = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL || "";

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Sample route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
  });//working
  
  app.post('/login', loginUser);
 