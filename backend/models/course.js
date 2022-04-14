const mongoose = require("mongoose")
const course = new mongoose.Schema({
    title: String,
    topic: String,
    body: String,
    createdAt: {type: Date, default: Date.now},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{collection: 'courses'})

module.exports = mongoose.model("Courses", course)