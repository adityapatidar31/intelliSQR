import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hii from the server",
  });
});

export default app;
