import catchErrors from "../../utils/catchErrors";
import { z } from "zod";

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

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      userId: "generated-id",
      username: request.username,
      email: request.email,
    },
  });
  // call a service
  // return a response
});

export default registerHandler;
