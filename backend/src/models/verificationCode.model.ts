import mongoose from "mongoose";
import { VerificationCodeType } from "../constants/verificationCodeTypes";

export interface IVerificationCode extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<IVerificationCode>({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: Object.values(VerificationCodeType),
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const verificationCodeModel = mongoose.model<VerificationCodeType>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_code"
);

export default verificationCodeModel;
