import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to check the request rate and limit
app.use(rateLimiter);


// custome middleware
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, request URL: ${req.url}`);
//     next(); // call it so it can go to the next middleware or route handler otherwise it will stuck
// });

app.use("/note", noteRoutes);


app.listen(8080, () => {});