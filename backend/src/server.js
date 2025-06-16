import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());// Middleware to parse JSON bodies
app.use("/note", noteRoutes);


app.listen(8080, () => {});