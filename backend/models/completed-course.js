const mongoose = require("mongoose")
const completedCourse = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses' },
},
{collection: 'completed-courses'})

module.exports = mongoose.model("CompletedCourse", completedCourse)
