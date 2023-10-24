const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      min: 5
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });
  