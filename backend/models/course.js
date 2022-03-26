const mongoose = require("mongoose")
const course = new mongoose.Schema({
    title: String,
    topic: String,
    body: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{collection: 'courses'})

module.exports = mongoose.model("Courses", course)