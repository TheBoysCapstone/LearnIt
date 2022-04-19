const mongoose = require("mongoose")
const thread = new mongoose.Schema({
    title: String,
    topic: String,
    content: String,
    createdAt: {type: Date, default: Date.now},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: {type: [{author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, content: String, createdAt:{type: Date, default: Date.now}}], default: []}
},
{collection: 'threads'})

module.exports = mongoose.model("Threads", thread)