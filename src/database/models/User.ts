import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  friends: {
    type: [Types.ObjectId],
  },
  enemies: {
    type: [Types.ObjectId],
  },
});

const User = model("User", userSchema, "users");

export default User;
