const mongoose = require('mongoose');

// User Schema and model definition
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

module.exports = mongoose.model('User', userSchema, 'users');
