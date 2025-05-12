import mongoose from "mongoose";
import { oneMonthFromNow } from "../utils/date";

export interface ISessionCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  userAgent: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: oneMonthFromNow,
  },
});

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
