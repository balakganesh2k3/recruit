import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
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
    prevtests: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tests",
      default: [],
    },
    prevmetrics: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Metrics",
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);