import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use("/note", noteRoutes);


app.listen(8080, () => {});


// mongodb+srv://banyuanjundao:QLMsrqKDszaEA3nK@cluster0.7kp6osn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0