import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_APP_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: process.env.LIMIT }));
app.use(express.urlencoded({ extended: true, limit: process.env.LIMIT }));
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      errors: err.error,
      path: req.originalUrl,
    });
  }

  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors: err.errors || null,
    path: req.originalUrl,
  });
});

export default app;
