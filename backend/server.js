import express from "express";

const app = express();

app.get("/note", (req, res) => {
    res.send("This is a GET request response");
});

app.post("/note", (req, res) => {
    res.status(201).json({message: "note created"})
    
});

app.put("/note/:id", (req, res) => {
    res.status(200).json({message: "note updated"})
});

app.delete("/note/:id", (req, res) => {
    res.status(200).json({message: "note deleted"})
});


app.listen(8080, () => {});
