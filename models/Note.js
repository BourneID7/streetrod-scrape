const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema ({
    body: {
        type: String,
    },
},
{
    toObject: {
    virtuals: true,
    },
    toJSON: {
    virtuals: true,
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;