import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
// import { faker } from '@faker-js/faker';

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    addresses: [addressSchema],
    contact: { type: Number, default: null },
    googleId: { type: String },
    profileImage: {
      type: String,
      default: "https://www.iconpacks.net/icons/2/free-icon-user-3297.png",
    },
    coverImage: {
      type: String,
      default:
        "https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    bio: { type: String, default: "" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

export default User;
