const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title is required"],
        trim: true,
        minlength: [3, "title should be at least 3 character"]
    },
    description: {
        type: String,
        reuire: true,
        trim: true,
        minlength: [10, "description should be at least 10 character"]
    },
    tag: {
        type: String,
        default: "general"
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/390574/pexels-photo-390574.jpeg?cs=srgb&dl=pexels-thisbrandstudio-390574.jpg&fm=jpg"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;