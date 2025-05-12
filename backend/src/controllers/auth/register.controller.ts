import { createAccount } from "../../services/auth.services";
import catchErrors from "../../utils/catchErrors";
import { z } from "zod";
import { setAuthCookies } from "../../utils/cookies";

const registerSchema = z
  .object({
    username: z.string().min(3).max(32).trim(),
    email: z.string().email().min(1).max(255).trim().toLowerCase(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const registerHandler = catchErrors(async (req, res) => {
  // validate a request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call a service

  const { user, accessToken, refreshToken } = await createAccount(request);

  // set cookies
  setAuthCookies({ res, accessToken, refreshToken });

  // return response
  return res.status(201).json(user);
});

export default registerHandler;
