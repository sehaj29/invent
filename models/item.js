const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, maxlength: 100 },
  description: { type: String, required: true, maxlength: 250 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true, min: 0, max: 100000 },
  stockQuantity:{type:Number,required:true},
  src:{type:String}

});

// Virtual for weapon's URL
itemSchema.virtual("url").get(function () {
  return "/Category/item/" + this._id;
});

// Export model
module.exports = mongoose.model("item", itemSchema);