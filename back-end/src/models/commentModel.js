const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  trail: { type: Schema.Types.ObjectId, ref: "Trail" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
