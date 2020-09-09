const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cathegorySchema = new Schema({
  name: String,
  trails: [{ type: Schema.Types.ObjectId, ref: "Trail" }],
});

module.exports = mongoose.model("Cathegory", cathegorySchema);
