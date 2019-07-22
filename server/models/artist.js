const mongoose = require("mongoose");

module.exports = mongoose.model("Artist", {
  firstName: { type: String },
  lastName: { type: String },
  profilePicture: { type: String },
  albumList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }]
});
