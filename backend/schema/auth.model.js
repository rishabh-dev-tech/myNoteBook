const mongoose = require('mongoose')

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^[A-Za-z0-9._%+-]+@[a-z0-9]+\.[A-Za-z]{2,}$/, "Please enter correct email"]
        },
        age: {
            type: Number,
            min: [18, "Age should be greater than equal to 18"],
            default: null
        },
        phone: {
            type: String,
            minlength: 10,
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            enum: ["student", 'teacher', "admin"],
            required: true,
            default: "student"
        },
        avatar: {
            type: String,
            default: 'https://www.iconpacks.net/icons/2/free-user-icon-4254-thumb.png'
        },
        skill: {
            type: Array,
            default: []
        }
    }, { timestamps: true }
)

const authModel = mongoose.model('User', authSchema)
module.exports = authModel;


//   username:{
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true
//         }