import express from "express";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use("/note", noteRoutes);


app.listen(8080, () => {});
