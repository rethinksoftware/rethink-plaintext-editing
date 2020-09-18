const mongoose = require('mongoose');

const urlShorten = new mongoose.Schema({
  originalUrl: {
      type: String,
      required: true,
      trim: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
    trim: true,
  }
});