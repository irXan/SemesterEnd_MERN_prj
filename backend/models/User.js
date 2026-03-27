import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    heightCm: {
      type: Number,
      default: 0,
      min: 0,
    },
    goal: {
      type: String,
      default: "Maintain",
      trim: true,
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    reminderTime: {
      type: String,
      default: "08:00",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
