import { jwtRefreshSecret, jwtSecret } from "../constants/env";
import { VerificationCodeType } from "../constants/verificationCodeTypes";
import sessionModel from "../models/session.model";
import { UserModel } from "../models/user.model";
import verificationCodeModel from "../models/verificationCode.model";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify user does not exists

  const userExists = await UserModel.exists({ email: data.email });

  if (userExists) {
    throw new Error("User already exists!");
  }

  // create a user

  const user = await UserModel.create({
    username: data.username,
    email: data.username,
    password: data.password,
  });
  // create verification code

  const verificationCode = await verificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });
  // send verification email

  // create a session

  const session = await sessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // create refresh token
  const refreshToken = jwt.sign(
    {
      sessionId: session._id,
    },
    jwtRefreshSecret,
    {
      expiresIn: "30d",
      audience: ["user"],
    }
  );

  // create access token

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    jwtSecret,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );

  // sign access token & refresh token
  // return user & tokens

  return {
    user,
    accessToken,
    refreshToken,
  };
};
