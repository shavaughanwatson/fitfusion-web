const mongoose = require('../config/config');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
