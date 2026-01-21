require('dotenv').config()

const DBURLS = process.env.DBURI
const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(DBURLS)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connected to Database", error)
    }
}

module.exports = connectToDB;