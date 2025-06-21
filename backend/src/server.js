import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";

import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config();

const app = express();
const __dirname = path.resolve(); // Get the current directory name
//console.log(`Current directory: ${__dirname}`);
const PORT = process.env.PORT;

// 
if (!process.env.NODE_ENV !== 'production') {
    // Middleware to eable CORS need to be set before rate limit
    app.use(cors()); // Enable CORS for all routes  || cors(origins: '......')
}

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

// Serve static files from the frontend build directory in production mdoe
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get(/.*/, (req, res) => { // '*' for older express
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    })
}


// Better practice of connecting database first then listen the server
connectDB().then(() => {
    app.listen(PORT, () => {console.log("Server Started on PORT: ", PORT)});
});
