const mongoose = require('../config/config');

const bookMarkSchema = new mongoose.Schema({
  name: String,
  gifUrl: String,
});

module.exports = mongoose.model('Bookmark', bookMarkSchema);
