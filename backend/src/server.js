import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to eable CORS need to be set before rate limit
app.use(cors()); // Enable CORS for all routes  || cors(origins: '......')
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

// Better practice of connecting database first then listen the server
connectDB().then(() => {
    app.listen(8080, () => {console.log("Server Started on port 8080")});
});
