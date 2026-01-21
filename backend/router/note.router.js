require("dotenv").config()
const express = require('express');
const NoteModel = require("../schema/note.model");
const VerifyUserFun = require("../middleware/VerifyAuth");

const router = express.Router();

router.post('/create', VerifyUserFun, async (req, res) => {
    const { title, description, tag, image } = req.body;
    try {
        const note = await (await NoteModel.create({ title, description, tag, image, createdBy: req.user })).populate("createdBy")
        res.send({
            success: true,
            message: "your notes created successfully",
            note: note
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal Server Error",
            err: error
        })
    }
})

router.get('/', VerifyUserFun, async (req, res) => {
    try {
        const note = await NoteModel.find({ createdBy: req.user }).populate("createdBy")
        res.send({
            success: true,
            message: "Your all notes",
            total_notes: note.length,
            note: note
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal Server Error",
            err: error
        })
    }
})
router.put('/update', VerifyUserFun, async () => { })
router.delete('/delete/:id', VerifyUserFun, async (req, res) => {
    console.log(req.params.id)
    try {
        await NoteModel.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            message: "your note has been deleted successfully!"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal Server Error",
            err: error
        })
    }
})

module.exports = router;