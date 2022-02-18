
const mongoose = require("mongoose")
const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
},
{collection: 'users'})

module.exports = mongoose.model("User", user)