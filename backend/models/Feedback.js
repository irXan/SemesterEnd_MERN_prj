import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "Open",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
