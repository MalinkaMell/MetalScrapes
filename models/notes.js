const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  text: { 
    type: String,
    required: [true, "Note cannot be empty"],
    minlength: 10
   },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;