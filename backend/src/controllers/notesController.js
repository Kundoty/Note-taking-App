import Note from "../model/Note.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: "Failed to get notes", error: error.message});
    }
    res.send("You just fetched the note");
}

export const createNote = async (req, res) => {
    try {
        const {title, description} = req.body;
        const newNote = new Note({ title, description});
        const note = await newNote.save();
        res.status(201).json({ message: "Note created" , note: note});
    } catch (error) {
        res.status(500).json({message: "Failed to create a note", error: error.message});
    }
}

export const updateNote = async (req, res) => {
    try {
        const {title, description} = req.body;
        // note/:id
        const id = req.params.id;
        const note = await Note.findByIdAndUpdate(id, {title, description}, {new: true});
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({ message: "Note updated", note: note });
    } catch (error) {
        res.status(500).json({message: "Failed to update the note", error: error.message});
    }
}

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id, {new: true});
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({ message: "Note deleted", note: note });
    } catch (error) {
        res.status(500).json({message: "Failed to delete the note", error: error.message});
    }
    
}