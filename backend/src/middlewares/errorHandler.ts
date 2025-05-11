import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  res.status(400).json({
    message: error.message,
    errors,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error at ${req.method} ${req.path}:`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  const status = error.status || INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal server error";

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;