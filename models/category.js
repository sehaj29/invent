const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 200 },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  return "/Category/category/" + this._id;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);