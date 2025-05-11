import express, { Request, Response } from "express";

export const app = express();

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Health Checkup successful!",
  });
});
