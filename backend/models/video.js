const mongoose = require("mongoose")
const video = new mongoose.Schema({
    video: String,
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
},
{collection: 'videos'})

module.exports = mongoose.model("Video", video)