import mongoose from "mongoose";

// define a schema for the Note
// create a model based on the schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Note = mongoose.model("Note", noteSchema)