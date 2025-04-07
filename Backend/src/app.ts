import express from "express";
import morgan from "morgan";

import userRouter from "./routes/userRoutes";
// import AppError from "./utils/appError";
// import globalErrorHandler from "./controllers/globalErrorHandler";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    limit: "10kb",
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hii from the server",
  });
});

app.use("/api/v1/users", userRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// global Error Handler
// app.use(globalErrorHandler);

export default app;
