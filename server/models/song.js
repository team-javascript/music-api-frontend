const mongoose = require('mongoose');

module.exports = mongoose.model('Song', {
  title: { type: String },
  songLink: { type: String },
  duration: { type: String }
});
