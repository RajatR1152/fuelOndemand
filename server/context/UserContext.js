const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: String,
    order: Array
})

const users = new mongoose.model('user', userSchema);

module.exports = users;