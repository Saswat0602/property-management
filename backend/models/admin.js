
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema =  mongoose.Schema;

const adminSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
      unique: true,
    },
  });
  


  adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  adminSchema.methods.generateToken = async function () {
    let token = jwt.sign({ _id: this._id }, process.env.SECRATE);
    return token;
  };
  const Admin = mongoose.model('Admin', adminSchema);
  
  module.exports = Admin;