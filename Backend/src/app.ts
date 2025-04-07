import express from "express";
import morgan from "morgan";

import userRouter from "./routes/userRoutes";

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

export default app;
