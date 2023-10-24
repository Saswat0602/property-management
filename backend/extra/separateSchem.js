const adminSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      required: true,
      unique: true,
    },
  });
  
  const Admin = mongoose.model('Admin', adminSchema);
  
  module.exports = Admin;
  