const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  gender:{
    type:String
  },
  birthdate:{
    type:String
  }
});

// const User = model("user", UserSchema);
module.exports = model("User", UserSchema);
// export default User;
