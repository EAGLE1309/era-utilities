const mongoose = require('mongoose');

module.exports = mongoose.model(
  "token",
  new mongoose.Schema({
    userId: String,
    tokens: String,
  })
);