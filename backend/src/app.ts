import express, { Request, Response } from "express";
import cors from "cors";
import { appOrigin } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: appOrigin,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(errorHandler);
