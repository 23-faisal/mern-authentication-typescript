import { CookieOptions, Response } from "express";
import { nodeEnv } from "../constants/env";
import { fifteenMinutesFromNow, oneMonthFromNow } from "./date";

interface IParams {
  res: Response;
  refreshToken: string;
  accessToken: string;
}

const secure = nodeEnv !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure,
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: oneMonthFromNow(),
  path: "/api/auth/refresh",
});

export const setAuthCookies = ({ res, accessToken, refreshToken }: IParams) => {
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());
};
