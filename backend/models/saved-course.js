const mongoose = require("mongoose")
const savedCourse = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
},
{collection: 'saved-courses'})

module.exports = mongoose.model("SavedCourse", savedCourse)
