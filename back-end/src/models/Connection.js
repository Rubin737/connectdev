import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["interest", "ignore", "accept", "reject"],
      message: "Request type is invalid",
    },
  },
});


export const Connection = mongoose.model("Connection",connectionSchema)