import { Schema, model } from "mongoose";

const mealTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("MealType", mealTypeSchema);