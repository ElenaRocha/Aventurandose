const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailSchema = new Schema({
  name: String,
  //img: Buffer,
  description: String,
  time: Number,
  length: Number,
  slope: Number,
  circular: Boolean,
  province: String,
  //location: { 0: String, 1: [Number] },
  location: [String], //GPS
  trasnport: String,
  cathegories: [{ type: Schema.Types.ObjectId, ref: "Cathegory" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Trail", trailSchema);
