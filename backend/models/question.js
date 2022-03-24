const mongoose = require("mongoose")
const question = new mongoose.Schema({
    question: String,
    answers: [{answer: String, isCorrect: Boolean}],
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
},
{collection: 'questions'})

module.exports = mongoose.model("Questions", question)