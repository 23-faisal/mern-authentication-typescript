import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(`Error at ${req.method} ${req.path}:`, error);

  const status = error.status || 500;

  const message = error.message || "Internal server error";

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorHandler;
