const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});


const propertySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  picture: [ImageSchema],
  price: {
    type: Number,
    required: true,
  },
  type:{
    type:String,
    required:true,
  },
  amenities:{
    type:String,
    
  }
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
