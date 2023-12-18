const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
// Custom Imports
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const listingRouter = require("./routes/listingRoutes");

const production = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: production ? "*" : "http://localhost:3000",
  methods: production ? "*" : ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*",
};

const app = express();
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);

// PRODUCTION SETUP
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Real Estate API is running...");
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
