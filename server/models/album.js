const mongoose = require("mongoose");

module.exports = mongoose.model("Album", {
  title: { type: String },
  albumArt: { type: String },
  songList: [{ type: mongoose.Schema.Types.ObjectId, ref:"Song" }],
  recordLabel: { type: String }
});
